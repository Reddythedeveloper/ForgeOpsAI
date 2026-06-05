from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    reply: str
    evidence: List[Dict[str, Any]] = []

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    msg = request.question.lower()
    
    # Simple intent routing for the Copilot MVP
    if "model" in msg and ("what" in msg or "list" in msg or "which" in msg or "have" in msg):
        return ChatResponse(
            reply="We currently have two active models in the registry:\n\n1. `fraud-v2` (Production)\n2. `churn-prod` (Canary 10%)\n\nWould you like me to run a drift triage for fraud-v2 or check the release readiness for churn-prod?",
            evidence=[
                {"type": "resource", "tag": "registry", "title": "Model Registry Search", "detail": "Found 2 registered models active in operational environments."}
            ]
        )
    elif "drift" in msg or "fraud" in msg:
        return ChatResponse(
            reply="I investigated the drift alert for the `fraud-v2` model. The telemetry shows that precision declined after the feature distribution shifted in `merchant_region`. Based on the runbook, I recommend re-running the backfill simulation tool before proceeding with retraining.",
            evidence=[
                {"type": "resource", "tag": "metrics", "title": "fraud-v2 Weekly Metrics", "detail": "Precision: 0.88 (declined from 0.92)\nRecall: 0.86\nTraffic: Normal"},
                {"type": "tool", "tag": "alerts", "title": "open_alert_bundle", "detail": '{"active_alerts": ["Drift detected in merchant_region feature slice"]}'},
                {"type": "retrieval", "tag": "runbook", "title": "runbook_fraud_v2_drift", "detail": "If precision drops below 0.90, check feature distribution for `merchant_region`... Re-run backfill simulation tool to estimate impact."}
            ]
        )
    elif "churn" in msg or "release" in msg or "ready" in msg:
        return ChatResponse(
            reply="I checked the release readiness for `churn-prod`. The offline AUC meets the threshold (0.86 > 0.85) and the canary error rate is currently stable at 0.4%. The feature pipeline has been verified in production. You are clear to proceed with a graduated rollout.",
            evidence=[
                {"type": "resource", "tag": "mlflow", "title": "MLflow Experiment: churn-prod", "detail": "Latest Run AUC: 0.862\nStatus: Completed"},
                {"type": "tool", "tag": "metrics", "title": "Canary Telemetry", "detail": "Error Rate: 0.4%\nLatency P99: 140ms"}
            ]
        )
    else:
        return ChatResponse(
            reply=f"I received your inquiry: '{request.question}'. As your MLOps copilot, I can help you investigate model drift, list active models, check release readiness, or draft incident reports. What would you like to do next?",
            evidence=[]
        )
