#!/bin/bash

# SSL and Domain Setup Script
# This script sets up nginx with SSL certificates for your domain
# Run this AFTER your app is successfully running on ip:3000

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
COMPOSE_FILE="docker-compose.yml"


# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Function to handle rate limiting
handle_rate_limiting() {
    print_warning "Let's Encrypt rate limiting detected!"
    echo ""
    echo "Rate limiting details:"
    echo "$1"
    echo ""
    
    print_warning "Let's Encrypt rate limiting options:"
    echo "1. Wait for rate limit to expire (usually 1 hour)"
    echo "2. Use a different email address"
    echo "3. Use staging environment (test certificates)"
    echo "4. Manual certificate generation"
    echo "5. Exit and try later"
    echo ""
    
    read -p "Choose an option (1-5): " choice
    
    case $choice in
        1)
            print_status "Waiting for rate limit to expire..."
            print_warning "Rate limits typically expire after 1 hour."
            print_status "You can run this script again later."
            exit 0
            ;;
        2)
            print_status "Using different email address..."
            read -p "Enter new email address: " new_email
            if [ -n "$new_email" ]; then
                print_status "Updating email address..."
                EMAIL_ADDRESS="$new_email"
                return 0
            else
                print_error "No email address provided."
                exit 1
            fi
            ;;
        3)
            print_status "Using Let's Encrypt staging environment..."
            print_warning "This will generate a test certificate (not trusted by browsers)"
            STAGING_MODE=true
            return 0
            ;;
        4)
            print_status "Manual certificate generation..."
            print_warning "This requires manual intervention."
            print_status "Steps:"
            echo "1. Stop nginx: docker compose -f $COMPOSE_FILE stop nginx"
            echo "2. Run certbot manually: docker compose -f $COMPOSE_FILE run --rm nginx certbot certonly --webroot --webroot-path=/var/www/certbot --non-interactive --agree-tos --email $EMAIL_ADDRESS --domains $DOMAIN,www.$DOMAIN"
            echo "3. Start nginx: docker compose -f $COMPOSE_FILE up -d nginx"
            exit 0
            ;;
        5)
            print_status "Exiting. You can run this script again later."
            exit 0
            ;;
        *)
            print_status "Waiting for rate limit to expire..."
            print_warning "Rate limits typically expire after 1 hour."
            print_status "You can run this script again later."
            exit 0
            ;;
    esac
}

# Function to create nginx configuration
create_nginx_config() {
    local config_type="$1"
    
    if [ "$config_type" = "temp" ]; then
        # Temporary HTTP-only configuration for certificate generation
        cat > nginx.conf << EOF
# Temporary HTTP-only configuration for certificate generation
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Handle ACME challenge for Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Proxy to Next.js App
    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
}
EOF
    else
        # Full configuration with HTTPS
        cat > nginx.conf << EOF
# HTTP server - redirect to HTTPS
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Handle ACME challenge for Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect all HTTP requests to HTTPS
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy to Next.js App
    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

}
EOF
    fi
}

# Function to generate SSL certificate
generate_ssl_certificate() {
    local email="$1"
    local staging="$2"
    
    print_status "Generating SSL certificate using certbot..."
    
    local certbot_cmd="certbot certonly --webroot --webroot-path=/var/www/certbot --non-interactive --agree-tos --email $email --domains $DOMAIN,www.$DOMAIN"
    
    if [ "$staging" = "true" ]; then
        certbot_cmd="$certbot_cmd --staging"
        print_warning "Using staging environment (test certificates)"
    fi
    
    docker compose -f "$COMPOSE_FILE" exec nginx sh -c "
        # Install certbot if not already installed
        if ! command -v certbot >/dev/null 2>&1; then
            apk add --no-cache certbot certbot-nginx openssl
        fi
        
        # Create required directories
        mkdir -p /var/www/certbot
        
        # Generate certificate with proper error handling
        $certbot_cmd || {
            echo 'Certificate generation failed. Checking for rate limiting...'
            certbot certificates
            exit 1
        }
    "
}

# Main script execution
print_status "🔒 SSL and Domain Setup Script"
echo ""

# Pull latest changes from git
print_status "Pulling latest changes from git..."
git pull

# Check if app is running
print_status "Checking if app is running..."
SERVER_IP="188.121.117.251"
if ! curl -f http://$SERVER_IP:3000 > /dev/null 2>&1; then
    print_error "App is not accessible on $SERVER_IP:3000!"
    print_error "Please ensure your app is running and accessible before setting up SSL"
    exit 1
fi

print_status "App is running successfully on $SERVER_IP:3000!"

# Check if app is accessible (redundant check, but keeping for clarity)
print_status "Testing app accessibility..."
if ! curl -f http://$SERVER_IP:3000 > /dev/null 2>&1; then
    print_error "App is not accessible on $SERVER_IP:3000!"
    print_error "Please ensure your app is running and accessible before setting up SSL"
    exit 1
fi

print_status "App is accessible on $SERVER_IP:3000!"

# Check required files for SSL setup
print_status "Checking SSL setup files..."
if [ ! -f "$COMPOSE_FILE" ]; then
    print_error "$COMPOSE_FILE not found!"
    exit 1
fi

print_status "All SSL setup files found!"

# Set default email address
EMAIL_ADDRESS="admin@$DOMAIN"
STAGING_MODE=false

# Check for existing rate limiting issues
print_status "Checking for existing rate limiting issues..."
RATE_LIMIT_ERROR=$(docker compose -f "$COMPOSE_FILE" logs nginx --tail=50 2>&1 | grep -i "rate limit\|too many failed authorizations" || true)

if [ -n "$RATE_LIMIT_ERROR" ]; then
    handle_rate_limiting "$RATE_LIMIT_ERROR"
fi

# Stop nginx if running (but keep app running)
print_status "Stopping nginx container if running..."
docker compose -f "$COMPOSE_FILE" stop nginx 2>/dev/null || true

# Clean up existing SSL certificates and volumes to avoid rate limiting issues
print_status "Cleaning up existing SSL certificates and volumes..."
docker compose -f "$COMPOSE_FILE" down nginx 2>/dev/null || true
docker volume rm prostore_ssl_certs 2>/dev/null || true
docker volume rm prostore_certbot_www 2>/dev/null || true

# Create temporary nginx configuration for certificate generation
print_status "Creating temporary nginx configuration for certificate generation..."
create_nginx_config "temp"

# Start nginx with temporary configuration
print_status "Starting nginx with temporary configuration for certificate generation..."
docker compose -f "$COMPOSE_FILE" up -d nginx

# Wait a moment for nginx to start
sleep 5

# Restart nginx to ensure it loads the new configuration
print_status "Restarting nginx to load temporary configuration..."
docker compose -f "$COMPOSE_FILE" restart nginx

# Wait for nginx to be ready
print_status "Waiting for nginx to be ready..."
attempts=0
max_attempts=30
while [ $attempts -lt $max_attempts ]; do
    if curl -f http://$SERVER_IP:80 > /dev/null 2>&1; then
        print_status "Nginx is ready!"
        break
    fi
    echo "Waiting for nginx... (attempt $((attempts + 1))/$max_attempts)"
    sleep 5
    attempts=$((attempts + 1))
done

if [ $attempts -eq $max_attempts ]; then
    print_error "Nginx failed to start within expected time!"
    print_status "Checking nginx logs..."
    docker compose -f "$COMPOSE_FILE" logs nginx --tail=20
    exit 1
fi

# Wait a moment for nginx to fully stabilize
print_status "Waiting for nginx to stabilize..."
sleep 10

# Check if nginx is serving HTTP properly
print_status "Testing HTTP nginx access..."
if curl -f http://$SERVER_IP:80 > /dev/null 2>&1; then
    print_status "Nginx HTTP is working properly!"
else
    print_error "Nginx HTTP is not accessible!"
    docker compose -f "$COMPOSE_FILE" logs nginx --tail=10
    exit 1
fi

# Generate SSL certificate
generate_ssl_certificate "$EMAIL_ADDRESS" "$STAGING_MODE"

# Check if certificate was generated successfully
if docker compose -f "$COMPOSE_FILE" exec nginx test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem 2>/dev/null; then
    print_status "SSL certificate generated successfully!"
else
    print_error "SSL certificate generation failed!"
    print_status "Checking certbot logs..."
    docker compose -f "$COMPOSE_FILE" logs nginx --tail=20
    
    # Check for rate limiting
    RATE_LIMIT_ERROR=$(docker compose -f "$COMPOSE_FILE" logs nginx --tail=20 2>&1 | grep -i "rate limit\|too many failed authorizations" || true)
    if [ -n "$RATE_LIMIT_ERROR" ]; then
        handle_rate_limiting "$RATE_LIMIT_ERROR"
    fi
    
    print_error "Certificate generation failed for unknown reason."
    print_status "You can try again later with: ./docker-ssl-domain.sh"
    exit 1
fi

# Create full nginx configuration with HTTPS
print_status "Creating full nginx configuration with HTTPS..."
create_nginx_config "full"

# Restart nginx with HTTPS configuration
print_status "Restarting nginx with HTTPS configuration..."
docker compose -f "$COMPOSE_FILE" restart nginx

# Wait for nginx to restart with HTTPS
print_status "Waiting for nginx to restart with HTTPS..."
attempts=0
max_attempts=30
while [ $attempts -lt $max_attempts ]; do
    if curl -f -k https://$SERVER_IP:443 > /dev/null 2>&1; then
        print_status "HTTPS is working!"
        break
    fi
    echo "Waiting for HTTPS... (attempt $((attempts + 1))/$max_attempts)"
    sleep 5
    attempts=$((attempts + 1))
done

# Test HTTPS access
print_status "Testing HTTPS access..."
if curl -f -k https://$SERVER_IP:443 > /dev/null 2>&1; then
    print_status "HTTPS is working properly!"
else
    print_warning "HTTPS may still be initializing..."
fi

# Success message
print_status "🎉 SSL setup completed!"
echo ""
echo "🌐 Your website is now accessible at:"
echo "   Direct IP: http://$SERVER_IP:3000"
echo ""
echo "🔧 Useful commands:"
echo "   Check nginx status: docker compose -f $COMPOSE_FILE ps nginx"
echo "   View nginx logs: docker compose -f $COMPOSE_FILE logs nginx -f"
echo "   Check SSL certificate: docker compose -f $COMPOSE_FILE exec nginx ls -la /etc/letsencrypt/live/$DOMAIN/"
echo "   Restart nginx: docker compose -f $COMPOSE_FILE restart nginx"
echo "   Renew certificates: docker compose -f $COMPOSE_FILE exec nginx certbot renew"
echo ""
echo "🔒 SSL Certificate Status:"
if docker compose -f "$COMPOSE_FILE" exec nginx test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem 2>/dev/null; then
    print_status "SSL certificate is properly configured!"
    print_status "Certificate expiry: $(docker compose -f "$COMPOSE_FILE" exec nginx certbot certificates | grep -A 2 "$DOMAIN" | grep "VALID" || echo "Check manually")"
else
    print_warning "SSL certificate setup may still be in progress..."
    print_status "Check nginx logs for more details"
fi

if [ "$STAGING_MODE" = "true" ]; then
    print_warning "⚠️  STAGING MODE: This certificate is for testing only and will not be trusted by browsers!"
    print_status "To get a production certificate, run this script again without staging mode."
fi

echo ""
print_status "Domain and SSL setup completed!"