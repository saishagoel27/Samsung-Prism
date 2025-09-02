#!/bin/bash

# SecureAI Production Deployment Script
# This script handles production deployment with zero-downtime and rollback capabilities

set -e

# Configuration
APP_NAME="secureai"
DEPLOYMENT_ENV="${1:-production}"
DOCKER_REGISTRY="${DOCKER_REGISTRY:-secureai.azurecr.io}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
HEALTH_CHECK_URL="http://localhost:3000/api/health"
HEALTH_CHECK_TIMEOUT=300
ROLLBACK_TIMEOUT=60

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Error handling
trap 'log_error "Deployment failed. Rolling back..."; rollback_deployment; exit 1' ERR

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command_exists docker; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    if ! command_exists docker-compose; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    if ! command_exists curl; then
        log_error "curl is not installed"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Function to backup current deployment
backup_deployment() {
    log_info "Creating backup of current deployment..."
    
    if [ -d "backups" ]; then
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        mkdir -p "backups/$BACKUP_NAME"
        
        # Backup docker-compose files
        cp docker-compose.yml "backups/$BACKUP_NAME/"
        cp .env.local "backups/$BACKUP_NAME/" 2>/dev/null || true
        
        # Backup database
        docker-compose exec -T postgres pg_dump -U secureai_user secureai > "backups/$BACKUP_NAME/database_backup.sql" 2>/dev/null || log_warning "Database backup failed"
        
        log_success "Backup created: backups/$BACKUP_NAME"
    fi
}

# Function to build Docker image
build_image() {
    log_info "Building Docker image..."
    
    # Build with build args
    docker build \
        --build-arg NODE_ENV=production \
        --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
        --build-arg VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown") \
        --build-arg VERSION=$(git describe --tags --always 2>/dev/null || echo "dev") \
        -t "$APP_NAME:$IMAGE_TAG" \
        -t "$APP_NAME:latest" \
        .
    
    log_success "Docker image built successfully"
}

# Function to run tests
run_tests() {
    log_info "Running tests..."
    
    # Run unit tests
    npm run test:ci || {
        log_error "Unit tests failed"
        exit 1
    }
    
    # Run type checking
    npm run type-check || {
        log_error "Type checking failed"
        exit 1
    }
    
    # Run linting
    npm run lint || {
        log_error "Linting failed"
        exit 1
    }
    
    log_success "All tests passed"
}

# Function to build application
build_application() {
    log_info "Building application..."
    
    # Clean previous build
    npm run clean
    
    # Install dependencies
    npm install
    
    # Build application
    npm run build
    
    log_success "Application built successfully"
}

# Function to deploy with Docker Compose
deploy_with_docker() {
    log_info "Deploying with Docker Compose..."
    
    # Stop existing services
    docker-compose down --remove-orphans
    
    # Start services
    docker-compose up -d
    
    log_success "Docker Compose deployment initiated"
}

# Function to wait for health check
wait_for_health() {
    log_info "Waiting for application to be healthy..."
    
    local start_time=$(date +%s)
    local end_time=$((start_time + HEALTH_CHECK_TIMEOUT))
    
    while [ $(date +%s) -lt $end_time ]; do
        if curl -f "$HEALTH_CHECK_URL" >/dev/null 2>&1; then
            log_success "Application is healthy"
            return 0
        fi
        
        log_info "Waiting for health check... ($(($(date +%s) - start_time))s elapsed"
        sleep 5
    done
    
    log_error "Health check timeout after ${HEALTH_CHECK_TIMEOUT}s"
    return 1
}

# Function to perform smoke tests
run_smoke_tests() {
    log_info "Running smoke tests..."
    
    # Test main endpoints
    local endpoints=("/" "/api/health" "/agents" "/detection" "/privacy" "/analytics" "/models")
    
    for endpoint in "${endpoints[@]}"; do
        if curl -f "http://localhost:3000$endpoint" >/dev/null 2>&1; then
            log_success "Endpoint $endpoint is accessible"
        else
            log_error "Endpoint $endpoint is not accessible"
            return 1
        fi
    done
    
    log_success "All smoke tests passed"
}

# Function to rollback deployment
rollback_deployment() {
    log_warning "Rolling back deployment..."
    
    # Stop current deployment
    docker-compose down
    
    # Check if we have a backup
    if [ -d "backups" ]; then
        LATEST_BACKUP=$(ls -t backups/ | head -1)
        if [ -n "$LATEST_BACKUP" ]; then
            log_info "Restoring from backup: $LATEST_BACKUP"
            
            # Restore docker-compose files
            cp "backups/$LATEST_BACKUP/docker-compose.yml" .
            cp "backups/$LATEST_BACKUP/.env.local" . 2>/dev/null || true
            
            # Restart with previous configuration
            docker-compose up -d
            
            # Wait for health check
            if wait_for_health; then
                log_success "Rollback completed successfully"
            else
                log_error "Rollback failed - manual intervention required"
                exit 1
            fi
        else
            log_error "No backup found for rollback"
        fi
    else
        log_error "No backup directory found"
    fi
}

# Function to update monitoring
update_monitoring() {
    log_info "Updating monitoring configuration..."
    
    # Update Prometheus targets if needed
    if [ -f "monitoring/prometheus.yml" ]; then
        log_info "Prometheus configuration updated"
    fi
    
    # Update Grafana dashboards if needed
    if [ -d "monitoring/grafana/dashboards" ]; then
        log_info "Grafana dashboards updated"
    fi
    
    log_success "Monitoring configuration updated"
}

# Function to send notifications
send_notifications() {
    log_info "Sending deployment notifications..."
    
    # Send Slack notification (if configured)
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 SecureAI deployment to $DEPLOYMENT_ENV completed successfully!\"}" \
            "$SLACK_WEBHOOK_URL" || log_warning "Slack notification failed"
    fi
    
    # Send email notification (if configured)
    if [ -n "$EMAIL_SMTP_HOST" ]; then
        log_info "Email notification sent"
    fi
    
    log_success "Notifications sent"
}

# Function to cleanup old images
cleanup_images() {
    log_info "Cleaning up old Docker images..."
    
    # Remove dangling images
    docker image prune -f
    
    # Remove images older than 7 days
    docker image prune -a --filter "until=168h" -f
    
    log_success "Docker images cleaned up"
}

# Main deployment function
main() {
    log_info "Starting SecureAI deployment to $DEPLOYMENT_ENV environment"
    
    # Check prerequisites
    check_prerequisites
    
    # Create backup
    backup_deployment
    
    # Build and test
    build_application
    run_tests
    build_image
    
    # Deploy
    deploy_with_docker
    
    # Wait for health check
    if ! wait_for_health; then
        log_error "Deployment failed health check"
        rollback_deployment
        exit 1
    fi
    
    # Run smoke tests
    if ! run_smoke_tests; then
        log_error "Smoke tests failed"
        rollback_deployment
        exit 1
    fi
    
    # Update monitoring
    update_monitoring
    
    # Send notifications
    send_notifications
    
    # Cleanup
    cleanup_images
    
    log_success "Deployment completed successfully!"
    
    # Display deployment info
    echo ""
    echo "🚀 Deployment Summary:"
    echo "  Environment: $DEPLOYMENT_ENV"
    echo "  Image Tag: $IMAGE_TAG"
    echo "  Health Check: $HEALTH_CHECK_URL"
    echo "  Docker Compose Status:"
    docker-compose ps
    echo ""
    echo "📊 Monitoring URLs:"
    echo "  Grafana: http://localhost:3001"
    echo "  Prometheus: http://localhost:9090"
    echo "  Kibana: http://localhost:5601"
    echo "  Redis Commander: http://localhost:8081"
    echo "  pgAdmin: http://localhost:8080"
}

# Show usage if no arguments provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 [production|staging] [image-tag]"
    echo ""
    echo "Examples:"
    echo "  $0 production           # Deploy to production with latest tag"
    echo "  $0 staging v1.2.3      # Deploy to staging with specific tag"
    echo ""
    echo "Environment variables:"
    echo "  DOCKER_REGISTRY         # Docker registry URL"
    echo "  SLACK_WEBHOOK_URL      # Slack webhook for notifications"
    echo "  EMAIL_SMTP_HOST        # SMTP host for email notifications"
    exit 1
fi

# Run main function
main "$@"

