# Rirm - Job Posting Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Auth Endpoints](#auth-endpoints)
  - [Job Endpoints](#job-endpoints)
  - [User Endpoints](#user-endpoints)

---

## Introduction
The Rirm a job posting app is a full-stack web application designed to help recruiters post jobs and users find relevant job opportunities. The app features role-based access control for recruiters and job seekers.

---

## Features
- **User Authentication**: Secure login and registration with JWT.
- **Role-Based Access**: Separate interfaces for recruiters and job seekers.
- **Job Management**: Recruiters can create, edit, and delete job postings.
- **Job Application**: Users can apply for jobs and view application statuses.
- **Job Alerts**: Recruiters can send email alerts for job openings.
- **Responsive Design**: Tailored for desktop and mobile use.

---

## Folder Structure

### Frontend
```
src/
├── components
│   ├── Home/
│   ├── Recruiter/
│   │   
│   │   
├── pages
│   ├── Home.jsx
│   ├── RegisterPage.jsx
│   ├── Login.jsx
│   ├── ShowJob.jsx
│   ├── AddJob.jsx
│   ├── EditJob.jsx
│   ├── VerifyEmail.jsx
│   ├── RecruiterBoard.jsx
│   ├── UserJobs.jsx
│   ├── JobApplications.jsx
│   └── NotFound.jsx
└── App.jsx
```

### Backend
```
backend/
├── config
│   └── dbConfig.js
├── controllers
│   ├── authController.js
│   ├── jobController.js
│   └── userController.js
├── models
│   ├── User.js
│   └── Job.js
|   └── OTP.js
├── routes
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── userRoutes.js
├── utils
│   ├── mailSender.js
│   
└── app.js
```

---

## Environment Variables

### Frontend
- **VITE_REACT_APP_BASE_URL**: The base URL for the backend API. Example: `http://localhost:8080/api`

### Backend
- **MONGO_URI**: MongoDB connection string. Example: `mongodb://127.0.0.1:27017/jobfinder`
- **FRONT_ENDS**: Allowed frontend origins for CORS. Example: `http://localhost:5173,http://localhost:5174`
- **PORT**: The port on which the backend server runs. Default: `8080`
- **JWT_SECRET**: Secret key for JWT token generation.
- **MAIL_HOST**: SMTP host for sending emails. Example: `smtp.gmail.com`
- **MAIL_USER**: Email address used for sending emails.
- **MAIL_PASS**: Email password or app-specific password.

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of the backend folder and add the following:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/jobfinder
   FRONT_ENDS=http://localhost:5173,http://localhost:5174
   PORT=8080
   JWT_SECRET=theMeCore
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your-email@gmail.com
   MAIL_PASS=your-email-password
   ```

4. Start the backend server:
   ```bash
   node app.js
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of the frontend folder and add the following:
   ```env
   VITE_REACT_APP_BASE_URL=http://localhost:8080/api
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Auth Endpoints
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/auth/register`      | Register a new user          |
| POST   | `/auth/login`         | Login a user                 |
| POST   | `/auth/send-otp`      | Send OTP for email verification |

### Job Endpoints
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/jobs`               | Get all jobs                 |
| GET    | `/jobs/:id`           | Get a job by ID              |
| POST   | `/jobs/create`        | Create a new job (Recruiter only) |
| PUT    | `/jobs/:id`           | Update a job (Recruiter only) |
| DELETE | `/jobs/:id`           | Delete a job (Recruiter only) |
| GET    | `/jobs/user-jobs`     | Get jobs created by the logged-in user |
| POST   | `/jobs/send-alert`    | Send job alerts via email    |

### User Endpoints
| Method | Endpoint                   | Description                  |
|--------|----------------------------|------------------------------|
| POST   | `/users/apply/:id`         | Apply for a job              |
| POST   | `/users/cancel/:id`        | Cancel a job application     |
| GET    | `/users/applications`      | Get jobs applied by the user |
| POST   | `/users/send-email-update` | Send email updates           |
| DELETE | `/users/delete-applications` | Delete all job applications |

---

## Notes
- Replace `your-email@gmail.com` and `your-email-password` with valid email credentials in the `.env` file for email notifications.
- Ensure MongoDB is running locally or update the `MONGO_URI` for a cloud instance.
- Use different `PORT` and `VITE_REACT_APP_BASE_URL` values for production setup.

