# 📝 Advanced MERN Task Manager

A robust, full-stack Task Management application built with the **MERN stack** (MongoDB, Express, React, Node.js). This project features secure **session-based authentication**, email verification with OTPs, and advanced task filtering capabilities.

## 🚀 Features

### 🔐 Authentication & Security

  * **Session-Based Auth:** Uses `httpOnly` cookies for secure session management (via `express-session` & `connect-mongo`).
  * **Secure Registration:** Email verification flow using OTPs (One-Time Passwords) sent via Email.
  * **Password Management:** Secure password hashing with `bcryptjs` and a Forgot/Reset Password flow using email OTPs.
  * **Route Protection:**
      * **Protected Routes:** Prevents unauthorized access to the dashboard.
      * **Reverse Protected Routes:** Redirects logged-in users away from login/register pages.

### 📋 Task Management

  * **CRUD Operations:** Create, Read, Update, and Delete tasks seamlessly.
  * **Modal Interface:** Create and Edit tasks using a clean, reusable modal component.
  * **Task Details:** Tracks Title, Description, Deadline (Date & Time), Priority, and Completion status.
  * **Smart Validation:** Prevents setting deadlines in the past.

### 🔍 Advanced Filtering & Sorting

  * **Search:** Real-time text search by task title.
  * **Filters:** Filter tasks by:
      * **Completion Status** (Completed/Incomplete).
      * **Priority** (Low, Medium, High).
      * **Date Range** (From/To based on Deadline).
  * **Sorting:** Sort by Deadline, Creation Date, or Priority in Ascending/Descending order.

-----

## 📂 Folder Structure

The project follows a monorepo-style structure with separate directories for client and server.

```text
todolist/
├── backend/                # Server-side logic (Express/Node)
│   ├── config/             # DB connection & Email templates
│   ├── controllers/        # Auth, Task, and User logic
│   ├── middleware/         # Auth checks
│   ├── models/             # Mongoose Schemas (User, Task)
│   ├── routes/             # API Routes
│   ├── server.js           # Entry point
│   └── .env                # Backend environment variables
│
├── frontend/               # Client-side UI (React/Vite)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable UI components (Navbar, Cards, Modals)
│   │   ├── pages/          # Full page views (Dashboard, Login, Register)
│   │   ├── services/       # API integration (Axios)
│   │   └── main.jsx        # React entry point
│   └── .env                # Frontend environment variables
│
└── package.json            # Root configuration for concurrent execution
```

-----

## 🛠️ Tech Stack

  * **Frontend:** React (Vite), Tailwind CSS, React Router DOM, Axios, React Toastify.
  * **Backend:** Node.js, Express.js.
  * **Database:** MongoDB (Atlas) with Mongoose.
  * **Authentication:** Express-Session, Connect-Mongo, BcryptJS.
  * **Email Services:** Nodemailer (SMTP).

-----

## ⚙️ Installation & Setup Guide

Follow these steps to set up the project locally.

### 1\. Prerequisites

Ensure you have the following installed:

  * [Node.js](https://nodejs.org/) (v14+)
  * [Git](https://git-scm.com/)
  * A [MongoDB Atlas](https://www.mongodb.com/atlas/database) account.

### 2\. Clone the Repository

```bash
git clone https://github.com/VyshnavReddyPinreddy/todolist-mern.git
cd todolist-mern
```

### 3\. Install Dependencies

You need to install dependencies for the root, backend, and frontend.

**Root (for concurrency):**

```bash
npm install
```

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

-----

## 🔐 Environment Configuration

You must create `.env` files in both the `backend` and `frontend` directories.

### 1\. Backend Configuration

Create a file named `.env` inside the `backend/` folder and add the following:

```env
# Server Configuration
PORT=5000

# MongoDB Connection (Get this from MongoDB Atlas)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todolist_db

# Session Security (Random string for signing cookies)
SESSION_SECRET=your_super_secret_random_string_here

# Email Configuration (SMTP details for OTPs)
# Example using Brevo (Sendinblue) or Gmail App Password
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_smtp_email@example.com
SMTP_PASSWORD=your_smtp_password
SENDER_EMAIL=no-reply@yourdomain.com
```

### 2\. Frontend Configuration

Create a file named `.env` inside the `frontend/` folder and add the following:

```env
# Points to the backend server
VITE_BACKEND_URL=http://localhost:5000
```

-----

## 🚀 Running the Project

This project uses `concurrently` to run both servers with a single command from the root directory.

1.  Navigate to the root folder (`todolist/`).
2.  Run the development command:

<!-- end list -->

```bash
npm run dev
```

  * **Backend** will start on `http://localhost:5000` (Red logs).
  * **Frontend** will launch on `http://localhost:5173` (Blue logs).

Open your browser and navigate to `http://localhost:5173` to use the application.

-----

## ☁️ How to Get MongoDB Connection URL

1.  Log in to **MongoDB Atlas**.
2.  Create a new Cluster (Free Tier).
3.  Go to **Database Access** -\> Create a Database User (keep the username/password safe).
4.  Go to **Network Access** -\> Allow Access from Anywhere (`0.0.0.0/0`) for local development.
5.  Click **Connect** -\> **Connect your application**.
6.  Copy the connection string.
7.  Paste it into `backend/.env` as `MONGO_URI`. Replace `<password>` with your database user password.

-----

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | | |
| POST | `/api/auth/register` | Register new user & send OTP |
| POST | `/api/auth/login` | Login user & set session |
| POST | `/api/auth/verify-email` | Verify email OTP |
| POST | `/api/auth/logout` | Destroy session |
| **Tasks** | | |
| GET | `/api/task/` | Get all tasks (supports filters) |
| POST | `/api/task/` | Create a new task |
| PUT | `/api/task/:id` | Update task details |
| PATCH | `/api/task/:id/complete`| Toggle completion status |
| DELETE | `/api/task/:id` | Delete a task |

-----

### 👤 Author

Developed by Vyshnav Reddy Pinreddy.
