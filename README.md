# 💼 QuickEMS — Enterprise Employer & Human Resource Management System

![React 19](https://img.shields.io/badge/React-19.2.4-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2.2-06B6D4?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-v5.2.1-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb)
![Inngest](https://img.shields.io/badge/Inngest-Background_Jobs-FF6B6B)
![License](https://img.shields.io/badge/License-ISC-green.svg)

> **QuickEMS** is a modern, enterprise-ready Full-Stack Employee Management System built to streamline HR workflows, automate attendance tracking, process leave applications, calculate payroll, and generate printable payslips. Powered by an event-driven background engine (**Inngest**) and automated email alerts (**Nodemailer**).

---

## 🌟 Key Features

### 👑 Admin Management Portal
- **Dashboard & Metrics**: Overview of total staff, active employees, daily attendance percentages, pending leave requests, and recent activity streams.
- **Employee Directory (CRUD)**: Create, update, soft-delete (`isDeleted`), and filter employees by department or active status.
- **Salary Configuration**: Manage basic salaries, allowances, and deductions per employee profile.
- **Leave Application Processing**: Review pending leave applications, view reasons/date ranges, and approve or reject with instant feedback.
- **Payslip Generation**: Produce monthly itemized payslips per employee with automated net salary calculation (`Basic + Allowances - Deductions`).

### 🧑‍💼 Employee Self-Service Portal
- **Interactive Check-In / Check-Out**: Single-click clock-in/out with automated working hours calculation and status assignment (`PRESENT`, `LATE`, `HALF DAY`).
- **Leave Requests**: Submit sick, casual, or annual leave applications with date pickers and detailed reason fields.
- **Personal Payslip Archive**: Access itemized monthly salary records and launch a clean, print-ready PDF/browser payslip modal.
- **Profile & Security**: Manage personal bio, view position/department info, and securely update password via modal interface.

### ⚡ Background Processing & Event Automation (Inngest)
- **Auto Check-Out Protection**: Automatically checks in 9 hours after clock-in. Sends a reminder email if unfulfilled, and auto-checks out after 10 hours as `Half Day / LATE`.
- **24-Hour Leave Escalation**: Sends escalation alerts to administrative emails if a leave request remains unanswered for 24 hours.
- **Daily Attendance Cron**: Automatically fires at **11:30 AM IST** daily to detect absent employees and dispatch automated email reminders.

---

## 📁 Repository Structure

```
Employer Management System/
├── .gitignore               # Global repository gitignore configuration
├── README.md                # Root comprehensive repository documentation
└── EMS/                     # Main Application Root
    ├── client/              # React 19 Frontend (Vite + Tailwind CSS v4)
    │   ├── public/          # Static assets & web manifest
    │   ├── src/
    │   │   ├── api/         # Axios API client instances & interceptors
    │   │   ├── components/  # Modals, Forms, Sidebar, Dashboard cards
    │   │   ├── context/     # Auth Context provider & persistent state
    │   │   ├── pages/       # Dashboard, Employees, Attendance, Leave, Payslips, Print
    │   │   ├── App.jsx      # React Router DOM v7 routes & protected routes
    │   │   ├── main.jsx     # App bootstrap
    │   │   └── index.css    # Tailwind CSS v4 directives & custom themes
    │   ├── .env             # Frontend environment variables
    │   ├── package.json     # Client dependency manifest
    │   ├── vite.config.js   # Vite build configuration
    │   └── vercel.json      # Client deployment configuration
    │
    └── server/              # Express 5 Backend (Node.js + Mongoose + Inngest)
        ├── config/          # DB connection & Nodemailer configuration
        ├── constants/       # Department & static constants
        ├── controllers/     # Auth, Employee, Attendance, Leave, Payslip controllers
        ├── inngest/         # Inngest event functions, sleep timers & cron jobs
        ├── middleware/      # JWT verification & RBAC authorization
        ├── models/          # Mongoose Schemas (User, Employee, Attendance, Leave, Payslip)
        ├── routes/          # Express API route modules
        ├── .env             # Server secrets & database connection strings
        ├── seed.js          # Database seeding script for initial Admin user
        ├── server.js        # Express app entry point
        ├── package.json     # Server dependency manifest
        └── vercel.json      # Server deployment configuration
```

---

## 🏛️ Architecture & Data Flow

For an in-depth breakdown with sequence diagrams, database schemas, and background job logic, consult the companion architecture artifact:
👉 **[Architecture & Technical Specifications](file:///C:/Users/shiva/.gemini/antigravity-ide/brain/32ff2e45-a4b7-41a4-bb10-84ef62b87ddc/project_architecture.md)**

```
┌─────────────────┐       HTTP / REST (JWT)       ┌──────────────────┐
│  React 19 SPA   │ ────────────────────────────► │ Express 5 Server │
│  (Vite + React) │ ◄──────────────────────────── │   (Node.js API)  │
└─────────────────┘                               └────────┬─────────┘
                                                           │
                                           ┌───────────────┼───────────────┐
                                           ▼               ▼               ▼
                                     ┌───────────┐   ┌───────────┐   ┌───────────┐
                                     │  MongoDB  │   │  Inngest  │   │ Nodemailer│
                                     │ Database  │   │ Event Q   │   │   (SMTP)  │
                                     └───────────┘   └───────────┘   └───────────┘
```

---

## 🛠️ Tech Stack & Dependencies

### Frontend (`EMS/client`)
- **Core Framework**: React 19, React DOM 19
- **Build Tooling**: Vite 8, @vitejs/plugin-react
- **Styling**: Tailwind CSS v4, PostCSS, Lucide React Icons
- **Routing & State**: React Router DOM v7, React Context API
- **HTTP & Utilities**: Axios, Date-fns, React Hot Toast

### Backend (`EMS/server`)
- **Runtime & Server**: Node.js, Express v5
- **Database ODM**: Mongoose v9 (MongoDB)
- **Security & Auth**: JSON Web Tokens (JWT), Bcrypt password hashing
- **Background Jobs**: Inngest SDK v4
- **Email Service**: Nodemailer (SMTP transport)
- **Form Parsing**: Multer, Cors, Dotenv

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MongoDB Database**: Local instance or MongoDB Atlas connection string
- **SMTP Server / Credentials**: (Optional for emails, e.g., Gmail App Password or Ethereal Mail)

---

### Step 1: Clone & Navigate to Workspace

```bash
git clone https://github.com/your-username/Employer-Managment-System.git
cd "Employer-Managment-System"
```

---

### Step 2: Environment Configuration

#### Backend Environment Setup
Create a file at `EMS/server/.env` with the following variables:

```env
PORT=4000
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@example.com

# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/fullstack-ems?retryWrites=true&w=majority

# Inngest Background Queue Credentials
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Nodemailer SMTP Configuration
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=noreply@quickems.com
```

#### Frontend Environment Setup
Create a file at `EMS/client/.env`:

```env
VITE_BASE_URL=http://localhost:4000
```

---

### Step 3: Install Dependencies

```bash
# Install Server Dependencies
cd EMS/server
npm install

# Install Client Dependencies
cd ../client
npm install
```

---

### Step 4: Seed Initial Admin User

Run the built-in database seeder script to populate an initial admin user:

```bash
cd EMS/server
npm run seed
```

---

### Step 5: Run Development Servers

#### Start Backend API Server
```bash
cd EMS/server
npm run server
# Output: Server running on port 4000 & Connected to Database
```

#### Start Frontend Client
```bash
cd EMS/client
npm run dev
# Output: VITE v8.x.x ready at http://localhost:5173/
```

#### (Optional) Run Inngest Dev Server
To test background functions, timers, and cron execution locally:
```bash
npx inngest-cli@latest dev -u http://localhost:4000/api/inngest
```

---

## 📡 API Endpoint Reference Summary

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticates credentials, returns JWT token & user payload |
| `GET` | `/api/auth/session` | Authenticated | Verifies JWT session token and returns active user state |
| `POST` | `/api/auth/change-password` | Authenticated | Changes current user password |

### Employee Management (`/api/employees`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/employees` | Admin | Fetches list of non-deleted employees with filtering |
| `POST` | `/api/employees` | Admin | Creates new user account + employee profile record |
| `PUT` | `/api/employees/:id` | Admin | Updates employee profile info, department, and compensation |
| `DELETE` | `/api/employees/:id` | Admin | Soft-deletes employee (`isDeleted: true`) and disables user account |

### Attendance Tracking (`/api/attendance`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/attendance` | Authenticated | Clocks in or clocks out employee for today's session |
| `GET` | `/api/attendance` | Authenticated | Retrieves attendance history (filtered by employee ID for staff) |

### Leave Management (`/api/leave`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/leave` | Authenticated | Submits a new leave request (triggers Inngest 24h escalation) |
| `GET` | `/api/leave` | Authenticated | Fetches leave applications (All for admin, self for employee) |
| `PATCH` | `/api/leave/:id` | Admin | Approves or rejects a pending leave application |

### Payslip Management (`/api/payslips`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payslips` | Admin | Generates a new monthly payslip for specified employee |
| `GET` | `/api/payslips` | Authenticated | Retrieves list of payslips |
| `GET` | `/api/payslips/:id` | Authenticated | Fetches single payslip detail for printable invoice view |

---

## 🌐 Deployment Guide

### Deploying Client to Vercel
1. Connect the `EMS/client` directory to your Vercel project.
2. Set the Root Directory to `EMS/client`.
3. Add Environment Variable `VITE_BASE_URL` pointing to your deployed backend URL.

### Deploying Server to Vercel / Render / Railway
1. Connect the `EMS/server` directory.
2. Configure Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `INNGEST_*`, `SMTP_*`).
3. Set start command to `node server.js`.

---

## 📄 License

This project is licensed under the **ISC License**.
