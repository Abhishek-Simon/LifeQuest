# LifeQuest - Life RPG

LifeQuest transforms your real-world ambitions into a tactical RPG experience. This repository contains the LifeQuest platform, split into a frontend UI (React/Vite) and an async backend API (FastAPI).

## Project Structure
- `frontend/`: The React + Vite frontend application.
- `backend/`: The FastAPI + SQLAlchemy backend application.

## 1. Frontend Development Setup
```bash
cd frontend
npm install
npm run dev
```

## 2. Backend Development Setup

### Python Environment Setup
You must have Python 3.10+ installed.
```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment
**Windows:**
```powershell
.\venv\Scripts\Activate
```
**Mac/Linux:**
```bash
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Environment Configuration
Copy `.env.example` to `.env` and fill in the details.
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` points to a valid PostgreSQL database.

### Database Setup & Migrations (Alembic)
Start your PostgreSQL server. Create the `lifequest` database if it doesn't exist.
To run the initial migrations and create the tables:
```bash
alembic upgrade head
```

### Running the API Server
```bash
uvicorn app.main:app --reload
```
The FastAPI server will start at: `http://localhost:8000`

### API Documentation
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

### Backend Testing
To run the test suite:
```bash
pytest
```
