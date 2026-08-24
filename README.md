# 🛡️ PingWatch — Endpoint Uptime Sentinel

**Monitor. Detect. Notify.**

PingWatch is an automated website and API uptime monitoring system with background health checks, live status monitoring, and instant notifications through Telegram, Email, and Webhooks.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Setup](#-setup)
- [Running the Application](#️-running-the-application)
- [URLs](#-urls)
- [API Endpoints](#-api-endpoints)
- [Useful Docker Commands](#-useful-docker-commands)
- [Environment Variables Reference](#-environment-variables-reference)
- [Security Notes](#-security-notes)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔍 Automated background health checks for websites and APIs
- 📊 Live status dashboard with real-time monitor updates
- 🔔 Instant notifications via **Telegram**, **Email**, and **Webhooks**
- ⏱️ Configurable check intervals powered by a BullMQ job queue
- 🔐 JWT-based authentication
- 🐳 Fully containerized local development with Docker Compose

---

## ⚡ Tech Stack

| Layer               | Technology                                         |
|---------------------|-----------------------------------------------------|
| Frontend            | React 18, Vite, Tailwind CSS, TanStack Query, Shadcn/ui |
| Backend             | Node.js, Express, TypeScript, Zod, JWT              |
| Database            | PostgreSQL 16                                        |
| Cache & Queue       | Redis 7, BullMQ                                      |
| Background Worker   | BullMQ Worker                                        |

---

## 📁 Project Structure

```text
pingWatch/
├── docker-compose.yml
├── package.json
├── src/
│   └── sql/
│       └── schema.sql
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    ├── package.json
    └── .env
```

---

## ✅ Prerequisites

Make sure the following are installed on your machine before you begin:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

---

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pingWatch.git
cd pingWatch
```

### 2. Backend Environment

Create a `backend/.env` file:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pingwatch_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_sentinel_key_32_chars
CLIENT_URL=http://localhost:5173
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### 3. Frontend Environment

Create a `frontend/.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start PostgreSQL & Redis

```bash
docker compose up -d
```

Check that containers are running:

```bash
docker compose ps
```

### 5. Run the Database Schema

```bash
docker exec -i pingwatch_postgres psql -U postgres -d pingwatch_db < src/sql/schema.sql
```

Verify tables were created:

```bash
docker exec -it pingwatch_postgres psql -U postgres -d pingwatch_db -c "\dt"
```

### 6. Install Dependencies

```bash
npm install

cd backend
npm install

cd ../frontend
npm install

cd ..
```

---

## 🛠️ Running the Application

### Option 1 — Run Everything

```bash
npm run dev
```

### Option 2 — Run Separately

**Backend:**

```bash
cd backend
npm run dev
```

**Worker:**

```bash
cd backend
npm run worker
```

**Frontend:**

```bash
cd frontend
npm run dev
```

---

## 🌐 URLs

| Service      | URL                              |
|--------------|-----------------------------------|
| Frontend     | http://localhost:5173             |
| Backend API  | http://localhost:5000/api         |

---

## 🔌 API Endpoints

| Method | Endpoint                              | Description             |
|--------|----------------------------------------|--------------------------|
| POST   | `/api/auth/register`                   | Register user            |
| POST   | `/api/auth/login`                      | Login                    |
| POST   | `/api/auth/logout`                     | Logout                   |
| GET    | `/api/addUrl/GetAllURLStauts`          | Get URL statuses         |
| GET    | `/api/addUrl/getMonitorsList`          | Get monitors             |
| POST   | `/api/addUrl/createMonitor`            | Create monitor           |
| POST   | `/api/pingUrl/check-Status/:id`        | Check monitor status     |
| GET    | `/api/notification/getNotificationList`| Get notifications        |

---

## 🐳 Useful Docker Commands

```bash
# View logs
docker compose logs -f

# PostgreSQL shell
docker exec -it pingwatch_postgres psql -U postgres -d pingwatch_db

# Redis CLI
docker exec -it pingwatch_redis redis-cli

# Stop containers
docker compose down

# Stop containers and delete data
docker compose down -v
```

---

## 🔧 Environment Variables Reference

### Backend (`backend/.env`)

| Variable              | Description                                      | Example                                              |
|-----------------------|---------------------------------------------------|-------------------------------------------------------|
| `PORT`                | Port the backend server listens on                 | `5000`                                                 |
| `NODE_ENV`            | Application environment                            | `development`                                          |
| `DATABASE_URL`        | PostgreSQL connection string                       | `postgresql://postgres:postgres@localhost:5432/pingwatch_db` |
| `REDIS_URL`           | Redis connection string                            | `redis://localhost:6379`                               |
| `JWT_SECRET`          | Secret key used to sign JWTs                        | `your_super_secret_sentinel_key_32_chars`              |
| `CLIENT_URL`          | URL of the frontend (used for CORS)                 | `http://localhost:5173`                                |
| `TELEGRAM_BOT_TOKEN`  | Bot token used to send Telegram notifications       | `your_telegram_bot_token`                              |

### Frontend (`frontend/.env`)

| Variable              | Description                       | Example                          |
|-----------------------|-------------------------------------|-------------------------------------|
| `VITE_API_BASE_URL`   | Base URL the frontend uses to reach the backend API | `http://localhost:5000/api` |

---

## 🔐 Security Notes

- Do **not** commit `.env` files to version control.
- Never expose your `JWT_SECRET`, database password, or `TELEGRAM_BOT_TOKEN` publicly.
- Add `.env` to `.gitignore` in both `backend/` and `frontend/`.
- Use strong, unique secrets in production and rotate them periodically.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  <strong>PINGWATCH — Monitor. Detect. Notify.</strong>
</p>