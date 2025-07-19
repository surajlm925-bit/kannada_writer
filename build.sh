#!/bin/bash

echo "🚀 Building Kannada AI Content Generator..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Create production directory
echo "📁 Creating production build..."
mkdir -p dist
mkdir -p dist/backend
mkdir -p dist/frontend

# Copy backend files
cp -r backend/* dist/backend/
cp -r frontend/dist/* dist/frontend/

# Create production config
cat > dist/docker-compose.yml << EOF
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

networks:
  default:
    driver: bridge
EOF

echo "✅ Build complete! Check the 'dist' directory."
echo "🔧 To deploy: cd dist && docker-compose up"