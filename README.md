# ForgeOps AI

ForgeOps AI is a production-style AI engineering platform built around an MCP server that exposes tools, resources, prompts, and sampling for operational AI workflows. The product acts as an internal AI copilot for engineering and ML teams.

## Features

- **MCP-native server** exposing capabilities for AI clients
- **LlamaIndex workflow orchestration** for multi-step debugging, summarization, and recommendation
- **MLOps integrations** including MLflow, metrics, and alerts
- **Full-stack infrastructure** with Next.js, FastAPI, PostgreSQL, Redis, and Qdrant

## Getting Started

### Local Infrastructure

Start the supporting infrastructure using Docker Compose:

```bash
cd infra
docker-compose up -d
```

### Backend Setup

1. Copy `.env.example` to `.env` and adjust the variables if needed.
2. Install Python dependencies:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
3. Run the FastAPI development server:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

Check the health endpoint at [http://localhost:8000/health](http://localhost:8000/health).
