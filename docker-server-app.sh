#!/bin/bash

# Application-Only Deployment Script
# This script deploys only the Next.js application (assumes database is already running)

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
COMPOSE_FILE="docker-compose.yml"


# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
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

print_header() {
    echo -e "\n${GREEN}================================${NC}"
    echo -e "${GREEN}   APPLICATION DEPLOYMENT SCRIPT${NC}"
    echo -e "${GREEN}================================${NC}\n"
}

print_header

# Pull latest changes
print_status "Pulling latest changes from git..."
git pull

# Check required files
print_status "Checking required files..."
if [ ! -f "package.json" ]; then
    print_error "package.json not found!"
    exit 1
fi

if [ ! -f "dockerfile" ]; then
    print_error "Dockerfile not found!"
    exit 1
fi

if [ ! -f "$COMPOSE_FILE" ]; then
    print_error "$COMPOSE_FILE not found!"
    exit 1
fi

if [ ! -f ".env.production" ]; then
    print_error ".env.production file not found!"
    echo "Please create a .env.production file with your production environment variables."
    exit 1
fi

print_status "All required files found!"

# Stop existing application container
print_status "Stopping existing application container..."
docker compose -f "$COMPOSE_FILE" stop app 2>/dev/null || echo "No application container to stop"

# Remove existing application container
print_status "Removing existing application container..."
docker compose -f "$COMPOSE_FILE" rm -f app 2>/dev/null || echo "No application container to remove"

# Clean up old application images
print_status "Cleaning up old application images..."
docker image prune -f
docker image prune -a --filter "until=24h" -f

# Build and start application
print_status "Building and starting application..."
DOCKER_BUILDKIT=1 docker-compose -f "$COMPOSE_FILE" build app
docker-compose -f "$COMPOSE_FILE" up -d app


# Wait for the application to be ready with health check
print_status "Waiting for the application to be ready..."
attempts=0
max_attempts=30
while [ $attempts -lt $max_attempts ]; do
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_status "Application is healthy and ready!"
        break
    fi
    echo "Waiting for application... (attempt $((attempts + 1))/$max_attempts)"
    sleep 10
    attempts=$((attempts + 1))
done

if [ $attempts -eq $max_attempts ]; then
    print_error "Application failed to start within expected time!"
    print_status "Checking application logs..."
    docker compose -f "$COMPOSE_FILE" logs app --tail=20
    exit 1
fi


# Test application functionality
print_status "Testing application functionality..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "Application homepage is accessible ✓"
else
    print_warning "Application homepage is not accessible"
fi

# Success message
print_status "🎉 Application deployment completed successfully!"
echo ""
echo "📱 Application Information:"
echo "   Local: http://localhost:3000"
echo "   Server IP: http://$(curl -s ifconfig.me):3000"
echo "   Health Check: http://localhost:3000/api/health"
echo ""
echo "🔧 Useful commands:"
echo "   Check status: docker compose -f $COMPOSE_FILE ps app"
echo "   View logs: docker compose -f $COMPOSE_FILE logs app"
echo "   Restart app: docker compose -f $COMPOSE_FILE restart app"
echo "   Stop app: docker compose -f $COMPOSE_FILE stop app"
echo ""
echo "📋 Next step: Run ./docker-ssl-domain.sh to set up SSL and domain"
print_status "Application is ready for production use!"