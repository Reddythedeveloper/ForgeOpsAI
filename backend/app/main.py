from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.app.api import prompts, chat

app = FastAPI(
    title="ForgeOps AI API",
    description="API Gateway for the ForgeOps AI Platform",
    version="0.1.0"
)

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prompts.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

class HealthResponse(BaseModel):
    status: str
    version: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="ok", version="0.1.0")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


