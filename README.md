<div align="center">

<br />

<img src="https://img.shields.io/badge/Nexthire-Job%20Search%20Platform-0f172a?style=for-the-badge&logoColor=white" alt="Nexthire Banner" />

<h1>🚀 Nexthire</h1>

<p><strong>Empowering students to find opportunities and recruiters to discover talent — all in one platform.</strong></p>

<br />

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br />

</div>

---

## 📌 Overview

**Nexthire** is a full-stack job portal built on the **MERN stack** that bridges the gap between students and recruiters. Students can discover and apply for job opportunities effortlessly, while recruiters can post listings, manage applications, and identify top talent — all within a single, seamless platform.

The interface is built with **shadcn/ui** and **Tailwind CSS**, delivering a modern, responsive, and intuitive user experience.

---

## ✨ Features

### 👨‍🎓 For Students
- 🔍 Browse and search job listings with filters
- 📝 Apply for jobs with a single click
- 📂 View and track all applied jobs
- 🧭 Personalized student dashboard

### 🧑‍💼 For Recruiters
- 📢 Post new job opportunities
- 🗂️ Manage and update existing listings
- 👥 View all applicants for each job
- 📊 Dedicated recruiter dashboard

### 🔐 Authentication & Security
- 🔒 Secure login & signup system
- 🎭 Role-based access control (Student / Recruiter)
- 🪙 JWT-based stateless authentication

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, shadcn/ui, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |
| **API** | RESTful APIs via Axios |

---

## 📂 Project Structure

```
Nexthire/
│
├── frontend/               # React.js frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components (shadcn/ui)
│   │   ├── pages/          # Route-level pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper utilities
│
├── backend/                # Node.js + Express backend
│   ├── config/             # DB & environment configuration
│   ├── controllers/        # Business logic handlers
│   ├── models/             # Mongoose database models
│   ├── routes/             # API route definitions
│   └── middleware/         # Auth & error middleware
│
└── .env                    # Environment variables (not committed)
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/nexthire.git
cd nexthire
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start the backend server:

```bash
npm start
```

> The backend will be running at `http://localhost:5000`

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> The frontend will be running at `http://localhost:5173`

---

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port for the backend server | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `mysecretkey123` |

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore`.

---

## 🔗 API Overview

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and receive JWT | Public |
| `GET` | `/api/jobs` | Fetch all job listings | Student |
| `POST` | `/api/jobs` | Create a new job listing | Recruiter |
| `POST` | `/api/jobs/:id/apply` | Apply for a job | Student |
| `GET` | `/api/jobs/:id/applicants` | View job applicants | Recruiter |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Empowering students to find opportunities and recruiters to discover talent — all in one platform.

</div>
