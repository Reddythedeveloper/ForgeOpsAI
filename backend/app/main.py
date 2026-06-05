from fastapi import FastAPI
from pydantic import BaseModel
from backend.app.api import prompts

app = FastAPI(
    title="ForgeOps AI API",
    description="API Gateway for the ForgeOps AI Platform",
    version="0.1.0"
)

app.include_router(prompts.router, prefix="/api")

class HealthResponse(BaseModel):
    status: str
    version: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="ok", version="0.1.0")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

