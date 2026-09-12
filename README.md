# ⚔️ LifeQuest

**LifeQuest** is a premium, full-stack Gamified Habit-Tracking RPG Platform. It transforms your real-life goals, routines, and habits into an immersive RPG adventure. Level up your real-world attributes, conquer "Bosses" (bad habits or massive projects), unlock achievements, and chart your progression through a sleek, dynamic, and cinematic interface.

---

## ✨ Features

- **Cinematic Onboarding**: A 5-step interactive initiation sequence that determines your player archetype, ambition, and core attributes.
- **Quest Engine & Dashboard**: Create, track, and complete daily quests. Quests grant XP and Gold, and improve specific RPG attributes.
- **RPG Attribute System**: Grow your character across 6 core stats: *Strength, Intellect, Endurance, Wisdom, Creativity,* and *Discipline*.
- **Boss Raids**: Take on complex, long-term challenges (like "Procrastination"). Deal damage to bosses by completing specific counter-quests.
- **Skill Tree & Armory**: Spend skill points earned from leveling up on a branching skill tree. Use earned gold in the Shop to buy equipment that enhances your progression.
- **Dynamic Achievements & Journal**: The game tracks your every move, unlocking achievements and writing an automated, immersive journal of your progression.
- **Secure Authentication**: Full JWT-based authentication system ensuring your character data and progress are safely isolated.

---

## 🛠️ Technology Stack

LifeQuest uses a modern, high-performance stack separated into a robust backend API and a dynamic frontend SPA.

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS (custom RPG-themed design system)
- **Animations:** Framer Motion
- **Routing:** React Router DOM v6
- **Icons:** Material Symbols & Lucide React

### Backend
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy with Alembic for migrations
- **Authentication:** OAuth2 with JWT (Passlib & python-jose)
- **Validation:** Pydantic

---

## 🚀 Getting Started

Follow these steps to set up LifeQuest locally for development.

### Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (v3.10+ recommended)
- **PostgreSQL** (running locally or via Docker)

### 1. Backend Setup
Navigate to the backend directory and set up the Python environment:

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your local PostgreSQL connection string and a secure JWT Secret

# Run Database Migrations
alembic upgrade head

# Start the FastAPI Server
uvicorn app.main:app --reload
```
The backend API will run at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup
Navigate to the frontend directory and start the Vite development server:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend application will run at `http://localhost:5173`. 

---

## 📂 Repository Structure

```text
LifeQuest/
├── backend/                  # FastAPI Application
│   ├── alembic/              # Database Migrations
│   ├── app/
│   │   ├── api/              # API Route Handlers
│   │   ├── core/             # Config & Security
│   │   ├── models/           # SQLAlchemy Models
│   │   ├── schemas/          # Pydantic Schemas
│   │   └── services/         # Business Logic
│   └── tests/                # Pytest Test Suite
│
├── frontend/                 # React Application
│   ├── public/               # Static Assets
│   └── src/
│       ├── components/       # Reusable UI Components
│       ├── context/          # React Context (Auth, Game, Onboarding)
│       ├── data/             # Game Content & Mock Definitions
│       ├── pages/            # Top-level Route Components
│       ├── services/         # API Client & Game Engine Logic
│       └── utils/            # Helper Functions & CSS Utilities
```

---

## 🔒 State Management Note

LifeQuest is actively transitioning from a mock frontend-driven state engine to a fully persisted backend architecture. Currently, authentication securely validates against PostgreSQL, while complex RPG mechanics (Skill Tree, Boss Raids, Journal) utilize a sophisticated user-scoped local storage caching mechanism (`lq_game_state_<userId>`). This ensures that progression is isolated per account on the device while the backend endpoints are being finalized.

---

## 📄 License

This project is proprietary and intended for demonstration purposes. All rights reserved.
