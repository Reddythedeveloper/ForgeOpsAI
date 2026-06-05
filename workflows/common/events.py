from llama_index.core.workflow import Event
from backend.app.schemas.investigation import EvidenceBundle

class SetupEvent(Event):
    """Event to pass initial parsed parameters."""
    model: str
    time_window: str
    question: str
    
class EvidenceGatheredEvent(Event):
    """Event carrying the constructed EvidenceBundle."""
    bundle: EvidenceBundle

class SynthesisCompleteEvent(Event):
    """Final output from LLM sampling/synthesis."""
    summary: str
    recommended_actions: list[str]
