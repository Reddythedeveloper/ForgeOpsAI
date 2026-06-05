import json
from mcp.server.fastmcp import FastMCP, Context
import logging

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("forgeops-mcp")

# Initialize FastMCP server
mcp = FastMCP("ForgeOps AI Server")

# --- Resources ---
@mcp.resource("metrics://models/{model}/daily")
def get_daily_metrics(model: str) -> str:
    """Read-only diagnostic metrics for a model."""
    data = {
        "model": model,
        "metrics": {"precision": 0.92, "recall": 0.88, "latency_ms": 120}
    }
    return json.dumps(data)

@mcp.resource("mlflow://experiments/{name}")
def get_mlflow_experiment(name: str) -> str:
    """Experiment history and latest runs."""
    data = {
        "experiment": name,
        "latest_run_id": "run_987",
        "status": "COMPLETED"
    }
    return json.dumps(data)

@mcp.resource("registry://models/{model}")
def get_model_registry(model: str) -> str:
    """Model card, lineage, owners, stage."""
    data = {
        "model": model,
        "stage": "Production",
        "owners": ["ml-team@example.com"]
    }
    return json.dumps(data)

@mcp.resource("runbook://incident/{topic}")
def get_incident_runbook(topic: str) -> str:
    """Incident runbook content."""
    return f"# Runbook: {topic}\n\n1. Check alerts.\n2. Verify metrics.\n3. Escalate if necessary."

# --- Tools ---
@mcp.tool()
def get_model_metrics(model: str, time_window: str) -> str:
    """Fetch precision, recall, latency, traffic, drift, error rate."""
    return json.dumps({
        "model": model,
        "time_window": time_window,
        "status": "healthy",
        "drift_detected": False
    })

@mcp.tool()
def compare_model_versions(model: str, version_a: str, version_b: str) -> str:
    """Compare two model versions across KPIs."""
    return json.dumps({
        "model": model,
        "comparison": {
            "winner": version_b,
            "improvement_pct": 5.2
        }
    })

@mcp.tool()
def open_alert_bundle(model: str) -> str:
    """Aggregate active alerts into a single view."""
    return json.dumps({
        "model": model,
        "active_alerts": ["Latency spike in eu-west-1"]
    })

@mcp.tool()
def create_incident_summary(incident_id: str, severity: str, details: str) -> str:
    """Build structured draft from evidence (write artifact)."""
    # In a real app, this would write to a DB or bucket
    logger.info(f"Created incident {incident_id} with severity {severity}")
    return json.dumps({
        "incident_id": incident_id,
        "status": "draft_created",
        "url": f"https://forgeops.ai/incidents/{incident_id}"
    })

# --- Prompts ---
@mcp.prompt()
def incident_postmortem(model: str, window: str, incident_id: str) -> str:
    """Structured incident draft."""
    return f"""Please draft an incident postmortem for the {model} model.
Time Window: {window}
Incident ID: {incident_id}

Include sections for: Timeline, Root Cause, Remediation, and Action Items.
"""

@mcp.prompt()
def drift_triage(model: str, period: str) -> str:
    """Root-cause hypotheses for model drift."""
    return f"""The {model} model has experienced drift over the period: {period}.
Please generate root-cause hypotheses based on the provided metrics and alerts."""

@mcp.prompt()
def release_readiness(model_version: str, environment: str) -> str:
    """Go/no-go checklist for model deployment."""
    return f"""Provide a release readiness checklist for model version {model_version} targeting {environment}.
Consider offline evaluations and canary metrics."""

# --- Sampling ---
@mcp.tool()
async def synthesize_evidence(ctx: Context, question: str, evidence: str) -> str:
    """Use sampling to ask the client LLM to synthesize evidence."""
    messages = [
        {
            "role": "user",
            "content": {
                "type": "text",
                "text": f"Question: {question}\n\nEvidence:\n{evidence}\n\nPlease synthesize a response based purely on the evidence."
            }
        }
    ]
    
    # Request sampling from the client
    result = await ctx.session.create_message(
        messages=messages,
        max_tokens=500
    )
    
    return result.content.text

if __name__ == "__main__":
    mcp.run(transport='stdio')
