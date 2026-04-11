# 🎯 BidZo - Full-Stack Monorepo

A production-ready monorepo structure for full-stack web applications with separated frontend and backend, enabling independent development and deployment.

An auction marketplace where users can list items and place bids. Features include authentication, listings, bidding, wallet, and order tracking with an escrow-based payment system.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Development Commands](#development-commands)
- [Project Structure](#project-structure-detailed)
- [API Documentation](#api-documentation)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## 🚀 Project Overview

**BidZo** is a scalable monorepo setup that provides:

- **Frontend**: React application with Vite for fast development
- **Backend**: Express.js REST API server
- **Shared**: Reusable utilities, types, and constants
- **Concurrent Development**: Run both apps simultaneously with a single command

### Features

✅ **Production-Ready Structure** - Clean separation of concerns  
✅ **Hot Module Reloading** - Fast development experience  
✅ **Concurrent Execution** - Run frontend and backend together  
✅ **Independent Scaling** - Scale apps independently  
✅ **Shared Code** - Reusable utilities across the monorepo  
✅ **Environment Configuration** - Separate config per app  
✅ **CORS Enabled** - Frontend-backend communication ready  

---

## 📁 Folder Structure

```
BidZo/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── App.jsx           # Root component
│   │   ├── App.css           # App styles
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── index.html            # HTML entry point
│   ├── vite.config.js        # Vite configuration
│   ├── package.json          # Client dependencies
│   ├── .env.example          # Environment variables template
│   ├── .env.local            # Local environment variables
│   └── .gitignore
│
├── server/                    # Express.js backend
│   ├── index.js              # Main server file
│   ├── package.json          # Server dependencies
│   ├── .env.example          # Environment variables template
│   ├── .env                  # Environment variables
│   └── .gitignore
│
├── shared/                    # Shared code (client & server)
│   ├── types/
│   │   ├── api.ts           # API types
│   │   └── README.md
│   ├── utils/
│   │   ├── validators.js    # Validation utilities
│   │   └── README.md
│   ├── constants/
│   │   ├── index.js         # Shared constants
│   │   └── README.md
│   ├── README.md
│   └── .gitignore
│
├── package.json              # Root monorepo config
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.2+ | UI library |
| | Vite | 5.0+ | Build tool & dev server |
| | Axios | 1.6+ | HTTP client |
| **Backend** | Express.js | 4.18+ | Web framework |
| | Node.js | 18.0+ | Runtime |
| | CORS | 2.8+ | Cross-origin requests |
| | dotenv | 16.3+ | Environment variables |
| **Dev Tools** | concurrently | 8.2+ | Run multiple commands |
| | nodemon | 3.0+ | Auto-restart server |

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** (for version control)

### Installation

1. **Clone or navigate to the repository**
   ```bash
   cd BidZo
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This command installs:
   - Root dependencies (`concurrently`)
   - Client dependencies (React, Vite, etc.)
   - Server dependencies (Express, dotenv, etc.)

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - 🌐 Frontend: [http://localhost:3000](http://localhost:3000)
   - 🔌 Backend: [http://localhost:5000](http://localhost:5000)
   - 💚 Health Check: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📜 Development Commands

### Root Level Commands

```bash
# Run both client and server concurrently
npm run dev

# Run only the frontend
npm run client

# Run only the backend
npm run server

# Install all dependencies
npm run install-all

# Build for production
npm run build

# Build only frontend
npm run build:client

# Build only backend
npm run build:server
```

### Client Commands (from `/client`)

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Server Commands (from `/server`)

```bash
# Start server
npm start

# Start with nodemon (auto-restart on changes)
npm run dev

# Run tests
npm test
```

---

## 🏗 Project Structure (Detailed)

### Frontend Structure (`/client`)

The React frontend is built with **Vite** for fast development and optimized production builds.

**Config Files:**
- `vite.config.js` - Vite configuration with React plugin
- `index.html` - HTML entry point
- `.env.example` - Environment variables template
- `.env.local` - Local development variables

**Source Files:**
- `src/main.jsx` - React DOM render entry point
- `src/App.jsx` - Root component with health check
- `src/App.css` - Component styles
- `src/index.css` - Global styles
- `src/components/` - Reusable React components
- `src/pages/` - Page-level components

**Features:**
- Server health status indicator
- Sample counter component
- Beautiful gradient UI
- Mobile-responsive design

### Backend Structure (`/server`)

The Express server provides REST API endpoints and is configured with **CORS** for frontend communication.

**Config Files:**
- `.env` - Environment variables (PORT, NODE_ENV, etc.)
- `.env.example` - Template for environment setup
- `package.json` - Dependencies and scripts

**API Routes:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/info` | Server information |
| POST | `/api/message` | Accept and echo messages |

**Features:**
- CORS middleware for frontend requests
- JSON request/response handling
- Error handling middleware
- 404 handler
- Logging on server start

### Shared Code (`/shared`)

Reusable code for both client and server.

**Types (`/types`):**
- `api.ts` - API response and model types
- TypeScript interfaces for type safety

**Utilities (`/utils`):**
- `validators.js` - Input validation functions
- Email, URL, and sanitization helpers

**Constants (`/constants`):**
- `index.js` - API endpoints, HTTP status codes, error messages

---

## 🔌 API Documentation

### Health Check

**Endpoint:** `GET /health`

**Description:** Verify server is running

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-08T12:00:00.000Z",
  "message": "Server is running successfully"
}
```

### Server Info

**Endpoint:** `GET /api/info`

**Description:** Get server metadata

**Response:**
```json
{
  "app": "BidZo Backend",
  "version": "1.0.0",
  "environment": "development"
}
```

### Post Message

**Endpoint:** `POST /api/message`

**Description:** Send a message to the server

**Request Body:**
```json
{
  "message": "Hello, Server!"
}
```

**Response:**
```json
{
  "success": true,
  "receivedMessage": "Hello, Server!",
  "timestamp": "2026-04-08T12:00:00.000Z"
}
```

---

## ⚙️ Environment Configuration

### Client Environment (`.env.local`)

```env
# API URL for backend communication
VITE_API_URL=http://localhost:5000
```

### Server Environment (`.env`)

```env
# Application environment
NODE_ENV=development

# Server port
PORT=5000

# API and client URLs
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

**How to use:**

1. Copy `.env.example` to `.env.local` (client) or `.env` (server)
2. Adjust values as needed
3. Server automatically loads from `.env` via `dotenv`
4. Client uses `VITE_` prefix for Vite build access

---

## 🐛 Troubleshooting

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::5000`

**Solution:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure server is running on port 5000
- Check `.env` files have correct URLs
- Verify CORS middleware in `server/index.js`

### Modules Not Found

**Problem:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
npm run install-all

# Or in specific folder
cd server && npm install
cd ../client && npm install
```

### Port 3000 Already in Use

**Problem:** `Error: EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or edit vite.config.js to use different port
```

### Frontend Can't Connect to Backend

**Problem:** Health check shows "offline"

**Solution:**
1. Verify server is running: `npm run server`
2. Check CORS configuration in `server/index.js`
3. Ensure `VITE_API_URL` matches server URL
4. Check browser console for specific errors

---

## 📦 Dependency Management

### Adding Dependencies

**Client:**
```bash
cd client
npm install axios
```

**Server:**
```bash
cd server
npm install next-middleware
```

### Updating Dependencies

**All packages:**
```bash
npm run install-all
```

---

## 🚀 Deployment Checklist

- [ ] Update `.env.example` files with production values
- [ ] Create `.env.production` files
- [ ] Build frontend: `npm run build:client`
- [ ] Build backend: `npm run build:server`
- [ ] Test production builds locally
- [ ] Configure CI/CD pipeline
- [ ] Set up environment variables on hosting platform
- [ ] Deploy to staging environment first
- [ ] Run smoke tests on staging
- [ ] Deploy to production

---

## 🔮 Future Enhancements

### Phase 1: Core Features
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication system (JWT/OAuth)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests
- [ ] Error logging and monitoring

### Phase 2: Advanced Features
- [ ] WebSocket support for real-time features
- [ ] Caching layer (Redis)
- [ ] Rate limiting
- [ ] Input validation and sanitization
- [ ] GraphQL API alternative

### Phase 3: DevOps & Deployment
- [ ] Docker containerization
- [ ] Kubernetes orchestration
- [ ] GitHub Actions CI/CD
- [ ] Automated testing in pipeline
- [ ] Staging and production environments

### Phase 4: Optimization
- [ ] Performance monitoring
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Code splitting and lazy loading
- [ ] Progressive Web App (PWA) features

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [Node.js Best Practices](https://nodejs.org/en/docs/)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎉 Getting Help

- Check the [Troubleshooting](#troubleshooting) section
- Review error messages in browser console
- Check server logs in terminal
- Create an issue on GitHub

---

**Happy coding! 🚀**

*Last updated: April 8, 2026*
