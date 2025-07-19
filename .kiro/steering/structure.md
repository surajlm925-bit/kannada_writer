# Project Structure

## Overview

The project follows a modular architecture with clear separation between frontend and backend components. The backend uses a dynamic module loading system that enables features to be toggled via configuration.

## Directory Organization

### Root Level

- `main.py`: Entry point for the FastAPI application
- `config.json`: Configuration file for enabling/disabling modules
- `requirements.txt`: Python dependencies for the project
- `build.sh`: Build script for the application

### Backend (`/backend`)

- `main.py`: Backend entry point
- `config.py`: Configuration loader
- `database.py`: Database connection handling
- `/routers`: Contains modular API endpoints
  - Each feature has its own router file (e.g., `top_band.py`, `package_writer.py`, `speed_50.py`)
- `/models`: Data models and schemas
- `/core`: Core functionality and utilities
- `/kannada_writer`: Kannada language processing utilities

### Frontend (`/frontend`)

- `/src`: Source code
  - `App.jsx`: Main application component
  - `/pages`: Page components
    - `UserInterface.jsx`: End-user interface
    - `AdminPanel.jsx`: Admin control panel
  - `/components`: Reusable UI components
- `package.json`: Frontend dependencies and scripts

### Core (`/core`)

- `module_loader.py`: Dynamic module loading system

### Tests (`/tests`)

- `conftest.py`: Test configuration
- `test_package_writer.py`: Tests for package writer module
- `test_speed_50.py`: Tests for speed 50 module
- `test_top_band.py`: Tests for top band module

## Code Organization Patterns

### Backend Modules

- Each feature is implemented as a self-contained router
- Modules are dynamically loaded based on configuration
- All modules follow the same interface pattern for consistency

### Frontend Components

- Page-level components in `/pages`
- Reusable UI elements in `/components`
- React Router for navigation between user and admin interfaces

## Development Workflow

1. Configure active modules in `config.json`
2. Run backend and frontend servers separately
3. Access API documentation at `/docs` endpoint
4. Use the web UI for content generation
