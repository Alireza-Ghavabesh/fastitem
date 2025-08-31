#!/bin/bash

# Master Deployment Script
# This script runs all three deployment scripts in the correct order:
# 1. Database deployment
# 2. Application deployment  
# 3. SSL and Domain setup

# Exit immediately if a command exits with a non-zero status
set -e

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

print_header() {
    echo -e "\n${BLUE}================================${NC}"
    echo -e "${BLUE}   MASTER DEPLOYMENT SCRIPT${NC}"
    echo -e "${BLUE}================================${NC}\n"
}

print_step() {
    echo -e "\n${BLUE}--- Step $1: $2 ---${NC}\n"
}

print_header

print_status "This script will deploy your entire ProStore application in three steps:"
echo "1. Application deployment (Next.js)"
echo "3. SSL setup (Nginx + Let's Encrypt)"
echo ""

read -p "Do you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_status "Deployment cancelled."
    exit 0
fi


# Step 1: Application Deployment
print_step "1" "Application Deployment"
print_status "Starting application deployment..."
if ./docker-server-app.sh; then
    print_status "✅ Application deployment completed successfully!"
else
    print_error "❌ Application deployment failed!"
    print_error "Please check the application logs and fix any issues before continuing."
    exit 1
fi

# Step 2: SSL Setup
print_step "2" "SSL Setup"
print_status "Starting SSL setup..."
if ./docker-ssl-domain.sh; then
    print_status "✅ SSL setup completed successfully!"
else
    print_warning "⚠️ SSL setup may have issues."
    print_warning "Check the nginx logs for more details."
fi

# Final success message
print_status "🎉 Complete deployment finished!"
echo ""
echo "📊 Deployment Summary:"
echo "   ✅ Application: Next.js running on port 3000"
echo "   ✅ SSL: Nginx with Let's Encrypt certificates"
echo ""
echo "🌐 Your ProStore is now accessible at:"
echo "   HTTPS: https://188.121.117.251:3000"
echo "   HTTP: http://188.121.117.251:3000"
echo "   Direct IP: http://$(curl -s ifconfig.me):3000"
echo ""
echo "🔧 Useful commands:"
echo "   Check all services: docker compose -f docker-compose.prod.yml ps"
echo "   View all logs: docker compose -f docker-compose.prod.yml logs -f"
echo "   Restart all: docker compose -f docker-compose.prod.yml restart"
echo "   Stop all: docker compose -f docker-compose.prod.yml down"
echo ""
echo "📋 Individual deployment scripts:"
echo "   Database only: ./docker-server-db.sh"
echo "   Application only: ./docker-server-app.sh"
echo "   SSL only: ./docker-ssl-domain.sh"
echo ""
print_status "Your ProStore is now fully deployed and ready for production use!"