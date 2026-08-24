
An automated, high-frequency website and API uptime monitoring system. Features periodic probe execution runners, live telemetry metrics, dark terminal UI, and instant multi-channel incident dispatches (Telegram, Email, Webhooks).

---

## ⚡ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, TanStack Query v5, Lucide Icons, Shadcn/ui
- **Backend:** Node.js, Express, TypeScript, Zod, JWT Authentication
- **Database & Storage:** PostgreSQL 16, Redis 7 (BullMQ Queues & State Locks)
- **Background Engine:** BullMQ Worker Pipelines with auto-lock renewal

---

## 📁 Repository Structure

pingWatch/├── docker-compose.yml       # PostgreSQL (pingwatch_postgres) & Redis (pingwatch_redis)├── package.json             # Root monorepo orchestration scripts├── src/│   └── sql/│       └── schema.sql       # Database table definitions & constraints├── backend/                 # Express API & background BullMQ probe workers│   ├── src/│   ├── package.json│   └── .env└── frontend/                # React dashboard & UI sentinel console├── src/├── package.json└── .env
---

## 🚀 Quick Setup & Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/pingWatch.git](https://github.com/your-username/pingWatch.git)
cd pingWatch
2. Configure Environment VariablesBackend (backend/.env)Code snippetPORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pingwatch_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_sentinel_key_32_chars
CLIENT_URL=http://localhost:5173
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
Frontend (frontend/.env)Code snippetVITE_API_BASE_URL=http://localhost:5000/api
3. Start Database & Cache ContainersSpin up PostgreSQL and Redis in the background:Bashdocker compose up -d
Verify that both containers are running and healthy:Bashdocker compose ps
4. Initialize Database Schema with docker execRun your database schema (src/sql/schema.sql) directly inside the running PostgreSQL container:Bashdocker exec -i pingwatch_postgres psql -U postgres -d pingwatch_db < src/sql/schema.sql
Windows PowerShell alternative:Bashdocker cp src/sql/schema.sql pingwatch_postgres:/tmp/schema.sql
docker exec -it pingwatch_postgres psql -U postgres -d pingwatch_db -f /tmp/schema.sql
Verify Tables Created:Bashdocker exec -it pingwatch_postgres psql -U postgres -d pingwatch_db -c "\dt"
5. Install DependenciesBash# Install root orchestration packages
npm install

# Install backend and frontend dependencies
cd backend && npm install
cd ../frontend && npm install
cd ..
🛠️ Running the ApplicationOption A: Run All Services Together (Recommended)From the project root:Bashnpm run dev
Option B: Run Services in Separate TerminalsTerminal 1: Backend APIBashcd backend
npm run dev
Terminal 2: BullMQ Probe WorkerBashcd backend
npm run worker
Terminal 3: Frontend DashboardBashcd frontend
npm run dev
Frontend Console: http://localhost:5173Backend API Base: http://localhost:5000/api🔌 API Endpoints ReferenceMethodEndpointDescriptionPOST/api/auth/registerRegister new operator accountPOST/api/auth/loginAuthenticate and issue HTTP cookie/JWTPOST/api/auth/logoutTerminate session and clear cookiesGET/api/addUrl/GetAllURLStautsFetch live HTTP status and latencies for all targetsGET/api/addUrl/getMonitorsList configured endpointsPOST/api/addUrl/createMonitorRegister a new target domain or URLPOST/api/pingUrl/check-Status/:idTrigger an immediate manual probe executionGET/api/notification/getNotificationListFetch alert dispatch stream & webhook logs🛑 Useful Docker CommandsBash# View live container logs
docker compose logs -f

# Enter interactive PostgreSQL shell
docker exec -it pingwatch_postgres psql -U postgres -d pingwatch_db

# Enter interactive Redis CLI
docker exec -it pingwatch_redis redis-cli

# Stop containers without losing data
docker compose down

# Stop containers and wipe volume data (Factory Reset)
docker compose down -v