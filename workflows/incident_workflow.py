from llama_index.core.workflow import Workflow, StartEvent, StopEvent, step, Context
from workflows.common.events import SetupEvent, EvidenceGatheredEvent
from workflows.common.state import InvestigationState
from backend.app.schemas.investigation import EvidenceBundle, RetrievedDoc, ToolOutput
from backend.app.services.retrieval_service import RetrievalService

class IncidentDraftWorkflow(Workflow):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.retrieval_service = RetrievalService()

    @step
    async def parse_request(self, ctx: Context, ev: StartEvent) -> SetupEvent:
        ctx.data["state"] = InvestigationState()
        state = ctx.data["state"]
        
        req = ev.get("request", {})
        state.model = req.get("model", "unknown-model")
        state.incident_id = req.get("incident_id", "inc_000")
        state.question = req.get("question", "Draft an incident report")
        
        print(f"[Incident] Parsing request for {state.incident_id}")
        return SetupEvent(
            model=state.model,
            time_window="",
            question=state.question
        )

    @step
    async def gather_evidence(self, ctx: Context, ev: SetupEvent) -> EvidenceGatheredEvent:
        state = ctx.data["state"]
        print(f"[Incident] Gathering evidence for {ev.model}")
        
        resources = [
            f"alerts://incident/{state.incident_id}",
            f"logs://inference/{ev.model}/latest"
        ]
        
        tools = [
            ToolOutput(
                tool_name="open_alert_bundle", 
                result={"active_alerts": ["Latency spike in eu-west-1"]}
            )
        ]
        
        docs = self.retrieval_service.retrieve(ev.question, top_k=2)
        
        bundle = EvidenceBundle(
            question=ev.question,
            resources=resources,
            tool_outputs=tools,
            retrieved_docs=docs
        )
        
        state.evidence_refs = resources + [d.doc_id for d in docs]
        return EvidenceGatheredEvent(bundle=bundle)

    @step
    async def synthesize(self, ctx: Context, ev: EvidenceGatheredEvent) -> StopEvent:
        print("[Incident] Drafting incident postmortem...")
        
        summary = "A Redis cache miss storm led to increased latency for the fraud-v2 model. " \
                  "The issue was mitigated by scaling read replicas as outlined in the runbook."
        actions = [
            "Implement circuit breaker pattern for Redis calls",
            "Increase default read replica count"
        ]
        
        return StopEvent(result={
            "summary": summary,
            "recommended_actions": actions,
            "evidence_refs": ctx.data["state"].evidence_refs
        })
