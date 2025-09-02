#!/bin/bash

set -euo pipefail

# SSL Setup Script for IP Address or Domain
# This script sets up SSL certificates for the IP address or domain
# Run this AFTER your app is successfully running on ip:5000

# Default Values
COMPOSE_FILE="docker-compose.yml"

# Set DOMAIN and EMAIL_ADDRESS via env or flags; DOMAIN must be a FQDN (Let's Encrypt does not issue IP certs)
DOMAIN=""
EMAIL_ADDRESS=""
STAGING_MODE="false"

SSL=true  # Set to 'true' to enable SSL, 'false' to skip SSL setup
SERVER_IP="188.121.117.251"  # Your server IP address (used for health check only)
PORT="3000"  # Port your app is running on

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

usage() {
    cat << EOF
Usage: $0 [options]

Options:
  --domain DOMAIN           Fully-qualified domain for Let's Encrypt (optional)
  --email EMAIL             Email for Let's Encrypt registration/expiry notices (required if --domain)
  --compose-file PATH       docker compose file (default: ${COMPOSE_FILE})
  --port PORT               Upstream app port inside docker network (default: ${PORT})
  --staging                 Use Let's Encrypt staging (test) environment
  --no-ssl                  Skip SSL setup

Environment overrides:
  DOMAIN, EMAIL_ADDRESS, COMPOSE_FILE, PORT, STAGING_MODE, SSL

Notes:
  - Without --domain, the script generates a self-signed certificate (browser warning expected).
  - Let's Encrypt will not issue certificates for IP addresses. DOMAIN must be a FQDN with a valid A/AAAA record.
  - This script expects a service named 'nginx' and an upstream named 'app' inside docker compose.
EOF
}

domain_is_ip() {
    local d="$1"
    if [[ "$d" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
        return 0
    fi
    return 1
}

ensure_compose() {
    if ! command -v docker >/dev/null 2>&1; then
        print_error "docker is not installed or not in PATH"
        exit 1
    fi
    if ! docker compose version >/dev/null 2>&1; then
        print_error "docker compose plugin is not available"
        exit 1
    fi
    if [ ! -f "$COMPOSE_FILE" ]; then
        print_error "Compose file not found: $COMPOSE_FILE"
        exit 1
    fi
}

ensure_nginx_up() {
    print_status "Ensuring nginx service is up..."
    docker compose -f "$COMPOSE_FILE" up -d nginx
}

# Exec helper for nginx container
nginx_exec() {
    docker compose -f "$COMPOSE_FILE" exec -T nginx sh -c "$1"
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
            echo "2. Run certbot manually: docker compose -f $COMPOSE_FILE run --rm nginx certbot certonly --webroot --webroot-path=/var/www/certbot --non-interactive --agree-tos --email $EMAIL_ADDRESS --domains $DOMAIN"
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

# Function to produce nginx configuration text
render_nginx_config() {
    local config_type="$1"
    if [ "$config_type" = "temp" ]; then
        cat << EOF
# Temporary HTTP-only configuration for certificate generation
server {
    listen 80;
    server_name ${DOMAIN:-_};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://app:${PORT};
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
        cat << EOF
# HTTP server - redirect to HTTPS and serve ACME
server {
    listen 80;
    server_name ${DOMAIN:-_};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name ${DOMAIN:-_};

    # If DOMAIN is not set (self-signed mode), use self-signed paths
    # Otherwise, use Let's Encrypt paths
    ssl_certificate ${DOMAIN:+/etc/letsencrypt/live/${DOMAIN}/fullchain.pem};
    ssl_certificate_key ${DOMAIN:+/etc/letsencrypt/live/${DOMAIN}/privkey.pem};
    ssl_certificate ${DOMAIN:+'/etc/letsencrypt/live/'${DOMAIN}'/fullchain.pem'};
    ssl_certificate_key ${DOMAIN:+'/etc/letsencrypt/live/'${DOMAIN}'/privkey.pem'};

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://app:${PORT};
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

    print_status "Generating SSL certificate using certbot service..."

    local extra=""
    if [ "${staging}" = "true" ]; then
        extra="--staging"
        print_warning "Using staging environment (test certificates)"
    fi

    docker compose -f "$COMPOSE_FILE" run --rm \
        certbot certbot certonly --webroot -w /var/www/certbot --non-interactive --agree-tos \
        --email "$email" -d "$DOMAIN" --rsa-key-size 4096 $extra || {
            print_error "Certificate generation failed."
            exit 1
        }
}

# Main script execution
print_status "🔒 SSL Setup Script"
echo ""

# Parse flags
while [[ ${1:-} =~ ^- ]]; do
    case "$1" in
        --domain)
            DOMAIN="$2"; shift 2;;
        --email)
            EMAIL_ADDRESS="$2"; shift 2;;
        --compose-file)
            COMPOSE_FILE="$2"; shift 2;;
        --port)
            PORT="$2"; shift 2;;
        --staging)
            STAGING_MODE="true"; shift 1;;
        --no-ssl)
            SSL=false; shift 1;;
        --help|-h)
            usage; exit 0;;
        *)
            print_error "Unknown option: $1"; usage; exit 1;;
    esac
done

# Validate inputs
ensure_compose

if [ "$SSL" = "true" ]; then
    if [ -n "$DOMAIN" ]; then
        if domain_is_ip "$DOMAIN"; then
            print_error "DOMAIN appears to be an IP. Use a real domain with DNS A/AAAA to this server."
            exit 1
        fi
        if [ -z "$EMAIL_ADDRESS" ]; then
            print_error "--email is required when --domain is provided"
            usage
            exit 1
        fi
    fi
fi

# Check if app is reachable externally (best-effort)
print_status "Checking if app is reachable at http://$SERVER_IP:$PORT (best-effort)..."
if ! curl -fsS --max-time 5 http://$SERVER_IP:$PORT > /dev/null 2>&1; then
    print_warning "App not reachable via $SERVER_IP:$PORT from this host. Proceeding anyway since ACME uses port 80 on nginx."
else
    print_status "App responded on $SERVER_IP:$PORT"
fi

# SSL setup
if [ "$SSL" = "true" ]; then
    if [ -z "$DOMAIN" ]; then
        # Self-signed mode
        print_warning "No --domain provided. Generating self-signed certificate. Browsers will show a warning."

        # Write HTTPS config referencing self-signed cert path
        cat > ./nginx.conf << EOF
server {
    listen 80;
    server_name _;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name _;

    ssl_certificate /etc/letsencrypt/selfsigned/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/selfsigned/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    location / {
        proxy_pass http://app:${PORT};
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

        ensure_nginx_up

        # Ensure openssl is available and generate self-signed cert inside nginx container
        nginx_exec "apk add --no-cache openssl >/dev/null 2>&1 || true"
        nginx_exec "mkdir -p /etc/letsencrypt/selfsigned && \
                    openssl req -x509 -nodes -newkey rsa:4096 -days 365 \
                    -keyout /etc/letsencrypt/selfsigned/privkey.pem \
                    -out /etc/letsencrypt/selfsigned/fullchain.pem \
                    -subj '/CN=selfsigned' >/dev/null 2>&1" || {
            print_error "Failed to generate self-signed certificate inside nginx container."
            exit 1
        }

        # Validate nginx config before restart
        if ! docker compose -f "$COMPOSE_FILE" exec -T nginx nginx -t; then
            print_error "nginx configuration test failed."
            exit 1
        fi

        docker compose -f "$COMPOSE_FILE" restart nginx
        print_status "Self-signed HTTPS enabled. Use --domain later for Let's Encrypt."
    else
        print_status "Setting up SSL for $DOMAIN"

        # Apply temporary HTTP-only config to host-mounted file
        print_status "Writing temporary HTTP config to ./nginx.conf for ACME..."
        render_nginx_config temp > ./nginx.conf

        # Start or ensure nginx is up with the temp config
        ensure_nginx_up

        # Issue certificate via certbot container (shares volumes with nginx)
        generate_ssl_certificate "$EMAIL_ADDRESS" "$STAGING_MODE"

        # Apply full HTTPS config to host-mounted file
        print_status "Writing full HTTPS config to ./nginx.conf..."
        render_nginx_config full > ./nginx.conf

        # Restart nginx once to pick up the new config and initial certs
        docker compose -f "$COMPOSE_FILE" restart nginx

        print_status "Let's Encrypt SSL enabled! Renewals handled by certbot service."
    fi
else
    print_warning "SSL setup skipped."
    exit 0
fi
