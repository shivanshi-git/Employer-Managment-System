# 💼 QuickEMS — Employer Management System

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/Employer-Managment-System/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/Employer-Managment-System/actions/workflows/ci.yml)
[![Security Audit](https://github.com/YOUR_USERNAME/Employer-Managment-System/actions/workflows/security.yml/badge.svg)](https://github.com/YOUR_USERNAME/Employer-Managment-System/actions/workflows/security.yml)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](./docker-compose.yml)
[![Node](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A full-stack **Employer Management System** built with React, Express, and MongoDB. Manage employees, attendance, leave, payslips, and payroll — with background job automation via Inngest.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start (Local Dev)](#-quick-start-local-dev)
- [Docker (Recommended)](#-docker-recommended)
- [DevOps & Infrastructure](#-devops--infrastructure)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)

---

## ✨ Features

- 🔐 JWT-based authentication with bcrypt password hashing
- 👥 Employee management (CRUD, profiles, documents)
- 📅 Attendance tracking & leave management
- 💰 Payslip generation
- 📊 Admin dashboard with real-time stats
- 📧 Email notifications via SMTP (Nodemailer)
- ⚙️ Background jobs & cron tasks via Inngest

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, TailwindCSS 4 |
| Backend | Express 5, Node.js 20 |
| Database | MongoDB + Mongoose |
| Background Jobs | Inngest |
| Auth | JWT + bcrypt |
| Deployment | Vercel |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/Employer-Managment-System.git
cd Employer-Managment-System/EMS

# 2. Set up environment variables
cp server/.env.example server/.env   # fill in your values
cp client/.env.example client/.env

# 3. Start the server
cd server && npm install && npm run server

# 4. Start the client (new terminal)
cd ../client && npm install && npm run dev
```

---

## 🐳 Docker (Recommended)

Run the entire stack — MongoDB, Express API, and React app — with a single command. No local MongoDB installation needed.

```bash
# Production stack
docker-compose up --build

# Dev stack with hot-reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

| Service | URL |
|---|---|
| React Client | http://localhost:80 |
| Express API | http://localhost:4000 |
| Health Check | http://localhost:4000/health |
| MongoDB | mongodb://localhost:27017 |

---

## ⚙️ DevOps & Infrastructure

### CI/CD Pipeline (GitHub Actions & Jenkins)

This repository supports both **GitHub Actions** and **Jenkins** pipelines:

#### 1. GitHub Actions (`.github/workflows/ci.yml`)
Every push and pull request to `main` triggers:
- Parallel Linting (`eslint`) & Vulnerability Auditing (`npm audit --audit-level=high`)
- Multi-stage Docker build validation for both client and server
- Automated zero-downtime deployment

#### 2. Jenkins Pipeline (`Jenkinsfile`)
A production-ready **Declarative Jenkins Pipeline** providing:
- Parallel stages for client & server code quality + security audits
- Automated production asset builds with Vite
- Docker container build and image tagging (`:latest` and `:${BUILD_NUMBER}`)
- Workspace cleanup (`cleanWs`) and build-retention policies

### Health Check Endpoint

```bash
curl http://localhost:4000/health
```

```json
{
  "status": "ok",
  "uptime": 342,
  "timestamp": "2026-09-15T09:47:45.000Z",
  "db": "connected",
  "environment": "production",
  "version": "1.0.0"
}
```

Returns `200 OK` when healthy, `503 Service Unavailable` when the DB is disconnected. Used by Docker `HEALTHCHECK`, load balancers, and uptime monitors.

### Security Hardening

| Measure | Implementation |
|---|---|
| HTTP Security Headers | `helmet` middleware (XSS, clickjacking, MIME sniffing) |
| Rate Limiting | `express-rate-limit` — 100 req/15 min per IP |
| Dependency Auditing | `npm audit` in CI + weekly scheduled workflow |
| Secret Management | `.env.example` templates, `.env` gitignored |
| Docker Security | Non-root user (`expressjs:nodejs`) in server container |

---

## 🔧 Environment Variables

Copy the example files and fill in your values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

See [`server/.env.example`](./server/.env.example) and [`client/.env.example`](./client/.env.example) for all required variables with descriptions.

---

## 📁 Project Structure

```
EMS/
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI/CD — lint, audit, Docker build, deploy
│       └── security.yml      # Weekly security audit
├── docker/
│   ├── Dockerfile.client     # Multi-stage React → Nginx image
│   ├── Dockerfile.server     # Multi-stage Express production image
│   └── nginx.conf            # Nginx config with SPA routing
├── client/                   # React + Vite frontend
│   ├── .env.example
│   └── src/
├── server/                   # Express API backend
│   ├── .env.example
│   ├── middleware/
│   │   └── requestLogger.js  # Structured JSON request logger
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── docker-compose.yml        # Production stack
└── docker-compose.dev.yml    # Dev override (hot-reload)
```
