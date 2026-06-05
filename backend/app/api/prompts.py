from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/prompts", tags=["prompts"])

class PromptVersion(BaseModel):
    id: str
    name: str
    version: str
    content: str
    description: str

# Mock database
MOCK_PROMPTS = [
    PromptVersion(
        id="p1", 
        name="incident_postmortem", 
        version="1.2", 
        content="Please draft an incident postmortem for the {model} model...",
        description="Drafts an incident postmortem from alerts and logs."
    ),
    PromptVersion(
        id="p2", 
        name="drift_triage", 
        version="2.0", 
        content="The {model} model has experienced drift over the period: {period}...",
        description="Generates root-cause hypotheses for model drift."
    )
]

@router.get("/", response_model=List[PromptVersion])
async def list_prompts():
    """List all prompt versions governed by the platform."""
    return MOCK_PROMPTS

@router.get("/{name}", response_model=PromptVersion)
async def get_prompt(name: str, version: Optional[str] = None):
    """Get a specific prompt, optionally by version."""
    for p in MOCK_PROMPTS:
        if p.name == name:
            if version is None or p.version == version:
                return p
    return None
