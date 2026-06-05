from typing import Optional
from llama_index.core.workflow import Context

class InvestigationState:
    """State to track the progress of an investigation workflow."""
    def __init__(self):
        self.model: Optional[str] = None
        self.time_window: Optional[str] = None
        self.question: Optional[str] = None
        self.evidence_refs: list[str] = []
        self.incident_id: Optional[str] = None
