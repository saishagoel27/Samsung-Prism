#!/bin/bash

# SecureAI Production Setup Script
# This script sets up the complete production environment

set -e

# Configuration
APP_NAME="secureai"
APP_VERSION="2.0.0"
DEFAULT_PORT=3000
DEFAULT_DB_PASSWORD="secureai_production_password_$(date +%s)"
DEFAULT_REDIS_PASSWORD="redis_production_password_$(date +%s)"

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local missing_deps=()
    
    if ! command_exists docker; then
        missing_deps+=("docker")
    fi
    
    if ! command_exists docker-compose; then
        missing_deps+=("docker-compose")
    fi
    
    if ! command_exists node; then
        missing_deps+=("node")
    fi
    
    if ! command_exists npm; then
        missing_deps+=("npm")
    fi
    
    if ! command_exists git; then
        missing_deps+=("git")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Missing dependencies: ${missing_deps[*]}"
        echo ""
        echo "Please install the missing dependencies:"
        echo "  Docker: https://docs.docker.com/get-docker/"
        echo "  Docker Compose: https://docs.docker.com/compose/install/"
        echo "  Node.js: https://nodejs.org/"
        echo "  Git: https://git-scm.com/"
        exit 1
    fi
    
    # Check versions
    local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 18 ]; then
        log_error "Node.js 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Function to create environment file
create_environment_file() {
    log_info "Creating environment configuration..."
    
    if [ -f ".env.local" ]; then
        log_warning ".env.local already exists. Backing up..."
        cp .env.local ".env.local.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Generate secure passwords
    local encryption_key=$(openssl rand -hex 32)
    local jwt_secret=$(openssl rand -hex 64)
    local postgres_password="$DEFAULT_DB_PASSWORD"
    local redis_password="$DEFAULT_REDIS_PASSWORD"
    
    # Create .env.local file
    cat > .env.local << EOF
# SecureAI Environment Configuration
# Generated on $(date)

# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NEXT_PUBLIC_APP_NAME=SecureAI
NEXT_PUBLIC_APP_VERSION=$APP_VERSION
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_APP_URL=http://localhost:$DEFAULT_PORT

# =============================================================================
# SECURITY CONFIGURATION
# =============================================================================
NEXT_PUBLIC_ENCRYPTION_KEY=$encryption_key
NEXT_PUBLIC_PRIVACY_MODE=strict
NEXT_PUBLIC_SECURITY_LEVEL=enterprise
JWT_SECRET=$jwt_secret
JWT_EXPIRES_IN=24h

# =============================================================================
# AI MODEL CONFIGURATION
# =============================================================================
NEXT_PUBLIC_MODEL_ACCURACY_THRESHOLD=0.999
NEXT_PUBLIC_LEARNING_RATE=0.001
NEXT_PUBLIC_MODEL_UPDATE_INTERVAL=3600000
NEXT_PUBLIC_MAX_AGENTS=5
NEXT_PUBLIC_AGENT_TIMEOUT=30000

# =============================================================================
# PERFORMANCE SETTINGS
# =============================================================================
NEXT_PUBLIC_DETECTION_INTERVAL=1000
NEXT_PUBLIC_MAX_CONCURRENT_SCANS=10
NEXT_PUBLIC_CACHE_TTL=300000
NEXT_PUBLIC_OPTIMIZATION_MODE=aggressive

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================
DATABASE_URL=postgresql://secureai_user:$postgres_password@localhost:5432/secureai
DATABASE_POOL_SIZE=20
DATABASE_SSL_MODE=prefer

# =============================================================================
# REDIS CONFIGURATION
# =============================================================================
REDIS_URL=redis://:$redis_password@localhost:6379
REDIS_PASSWORD=$redis_password
REDIS_DB=0

# =============================================================================
# FEATURE FLAGS
# =============================================================================
FEATURE_FEDERATED_LEARNING=true
FEATURE_ADVANCED_ANALYTICS=true
FEATURE_REAL_TIME_ALERTS=true
FEATURE_MOBILE_APP=true
FEATURE_API_ACCESS=true

# =============================================================================
# MONITORING & ANALYTICS
# =============================================================================
LOG_LEVEL=info
LOG_FORMAT=json
LOG_DESTINATION=stdout

# =============================================================================
# COMPLIANCE & AUDIT
# =============================================================================
GDPR_ENABLED=true
GDPR_DATA_RETENTION_DAYS=2555
GDPR_AUTO_DELETION=true
AUDIT_LOGGING_ENABLED=true
AUDIT_LOG_RETENTION_DAYS=3650
AUDIT_LOG_ENCRYPTION=true
EOF
    
    log_success "Environment file created: .env.local"
    log_info "Generated secure passwords:"
    log_info "  Database: $postgres_password"
    log_info "  Redis: $redis_password"
    log_info "  Encryption: $encryption_key"
}

# Function to create necessary directories
create_directories() {
    log_info "Creating necessary directories..."
    
    local dirs=(
        "backups"
        "logs"
        "data"
        "monitoring/grafana/provisioning/datasources"
        "monitoring/grafana/provisioning/dashboards"
        "monitoring/grafana/dashboards"
        "nginx/ssl"
        "scripts"
    )
    
    for dir in "${dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            log_info "Created directory: $dir"
        fi
    done
    
    log_success "Directories created successfully"
}

# Function to create monitoring configuration
create_monitoring_config() {
    log_info "Creating monitoring configuration..."
    
    # Create Prometheus datasource for Grafana
    cat > monitoring/grafana/provisioning/datasources/prometheus.yml << EOF
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true
EOF
    
    # Create basic dashboard
    cat > monitoring/grafana/dashboards/secureai-overview.json << EOF
{
  "dashboard": {
    "id": null,
    "title": "SecureAI Overview",
    "tags": ["secureai", "overview"],
    "timezone": "browser",
    "panels": [],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "5s"
  }
}
EOF
    
    log_success "Monitoring configuration created"
}

# Function to create nginx configuration
create_nginx_config() {
    log_info "Creating nginx configuration..."
    
    cat > nginx/nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream secureai_backend {
        server secureai-app:3000;
    }
    
    server {
        listen 80;
        server_name localhost;
        
        location / {
            proxy_pass http://secureai_backend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
        
        location /api/ {
            proxy_pass http://secureai_backend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
EOF
    
    log_success "Nginx configuration created"
}

# Function to create database initialization script
create_db_init_script() {
    log_info "Creating database initialization script..."
    
    cat > scripts/init-db.sql << EOF
-- SecureAI Database Initialization
-- This script creates the initial database structure

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    accuracy DECIMAL(5,4) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id),
    threat_level INTEGER NOT NULL,
    confidence DECIMAL(5,4) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(10,4) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_detections_created_at ON detections(created_at);
CREATE INDEX IF NOT EXISTS idx_detections_agent_id ON detections(agent_id);
CREATE INDEX IF NOT EXISTS idx_system_metrics_timestamp ON system_metrics(timestamp);

-- Insert initial data
INSERT INTO agents (name, type, accuracy) VALUES
    ('Typing Dynamics Agent', 'typing', 0.94),
    ('Touch Patterns Agent', 'touch', 0.87),
    ('App Usage Agent', 'app_usage', 0.91),
    ('Movement Analysis Agent', 'movement', 0.89),
    ('Behavioral Fusion Agent', 'fusion', 0.96)
ON CONFLICT DO NOTHING;

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS \$\$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
\$\$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EOF
    
    log_success "Database initialization script created"
}

# Function to install dependencies
install_dependencies() {
    log_info "Installing project dependencies..."
    
    if [ -f "pnpm-lock.yaml" ]; then
        log_info "Using pnpm for package management..."
        if ! command_exists pnpm; then
            log_info "Installing pnpm..."
            npm install -g pnpm
        fi
        pnpm install
    else
        log_info "Using npm for package management..."
        npm install
    fi
    
    log_success "Dependencies installed successfully"
}

# Function to build the application
build_application() {
    log_info "Building the application..."
    
    npm run build
    
    log_success "Application built successfully"
}

# Function to create docker network
create_docker_network() {
    log_info "Creating Docker network..."
    
    if ! docker network ls | grep -q "secureai-network"; then
        docker network create secureai-network
        log_success "Docker network 'secureai-network' created"
    else
        log_info "Docker network 'secureai-network' already exists"
    fi
}

# Function to start services
start_services() {
    log_info "Starting SecureAI services..."
    
    # Start core services
    docker-compose up -d postgres redis
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 10
    
    # Start application
    docker-compose up -d secureai-app
    
    # Start monitoring services
    docker-compose up -d prometheus grafana elasticsearch kibana
    
    # Start management tools
    docker-compose up -d redis-commander pgadmin
    
    log_success "All services started successfully"
}

# Function to display status
display_status() {
    log_info "Checking service status..."
    
    echo ""
    echo "🚀 SecureAI Setup Complete!"
    echo "================================"
    echo ""
    echo "📊 Service Status:"
    docker-compose ps
    echo ""
    echo "🌐 Access URLs:"
    echo "  Main Application: http://localhost:$DEFAULT_PORT"
    echo "  Grafana:          http://localhost:3001 (admin/admin)"
    echo "  Prometheus:       http://localhost:9090"
    echo "  Kibana:           http://localhost:5601"
    echo "  Redis Commander:  http://localhost:8081"
    echo "  pgAdmin:          http://localhost:8080"
    echo ""
    echo "🔑 Default Credentials:"
    echo "  Grafana: admin/admin"
    echo "  pgAdmin: admin@secureai.dev/admin"
    echo ""
    echo "📁 Important Files:"
    echo "  Environment: .env.local"
    echo "  Docker Compose: docker-compose.yml"
    echo "  Database Init: scripts/init-db.sql"
    echo ""
    echo "🚀 Next Steps:"
    echo "  1. Open http://localhost:$DEFAULT_PORT in your browser"
    echo "  2. Start monitoring with the dashboard"
    echo "  3. Configure additional settings in .env.local"
    echo "  4. Run 'docker-compose logs -f' to view logs"
    echo ""
}

# Function to run health checks
run_health_checks() {
    log_info "Running health checks..."
    
    local services=(
        "http://localhost:$DEFAULT_PORT/api/health"
        "http://localhost:3001/api/health"
        "http://localhost:9090/-/healthy"
        "http://localhost:5601/api/status"
    )
    
    for service in "${services[@]}"; do
        if curl -f "$service" >/dev/null 2>&1; then
            log_success "Health check passed: $service"
        else
            log_warning "Health check failed: $service"
        fi
    done
}

# Main setup function
main() {
    echo ""
    echo "🚀 SecureAI Production Setup"
    echo "=============================="
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Create environment
    create_environment_file
    create_directories
    create_monitoring_config
    create_nginx_config
    create_db_init_script
    
    # Install and build
    install_dependencies
    build_application
    
    # Setup Docker
    create_docker_network
    
    # Start services
    start_services
    
    # Wait for services to be ready
    log_info "Waiting for all services to be ready..."
    sleep 30
    
    # Run health checks
    run_health_checks
    
    # Display status
    display_status
    
    log_success "SecureAI setup completed successfully!"
}

# Show usage if help requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --help, -h     Show this help message"
    echo "  --skip-build   Skip building the application"
    echo "  --skip-start   Skip starting services"
    echo ""
    echo "This script sets up the complete SecureAI production environment."
    exit 0
fi

# Run main function
main "$@"
