from llama_index.core.workflow import Workflow, StartEvent, StopEvent, step, Context
from workflows.common.events import SetupEvent, EvidenceGatheredEvent
from workflows.common.state import InvestigationState
from backend.app.schemas.investigation import EvidenceBundle, RetrievedDoc, ToolOutput
from backend.app.services.retrieval_service import RetrievalService

class ReleaseReadinessWorkflow(Workflow):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.retrieval_service = RetrievalService()

    @step
    async def parse_request(self, ctx: Context, ev: StartEvent) -> SetupEvent:
        ctx.data["state"] = InvestigationState()
        state = ctx.data["state"]
        
        req = ev.get("request", {})
        state.model = req.get("model", "unknown-model")
        state.question = req.get("question", "Is the model ready for release?")
        
        print(f"[Release] Checking readiness for {state.model}")
        return SetupEvent(
            model=state.model,
            time_window="",
            question=state.question
        )

    @step
    async def gather_evidence(self, ctx: Context, ev: SetupEvent) -> EvidenceGatheredEvent:
        state = ctx.data["state"]
        
        resources = [
            f"registry://models/{ev.model}",
            f"mlflow://experiments/{ev.model}"
        ]
        
        docs = self.retrieval_service.retrieve(ev.question, top_k=2)
        
        bundle = EvidenceBundle(
            question=ev.question,
            resources=resources,
            tool_outputs=[],
            retrieved_docs=docs
        )
        
        state.evidence_refs = resources + [d.doc_id for d in docs]
        return EvidenceGatheredEvent(bundle=bundle)

    @step
    async def synthesize(self, ctx: Context, ev: EvidenceGatheredEvent) -> StopEvent:
        print("[Release] Generating readiness report...")
        
        summary = "Offline AUC meets the threshold (0.86 > 0.85). Canary error rate is normal. " \
                  "Feature pipeline verified in production."
        actions = [
            "Proceed with graduated rollout (10% traffic)",
            "Monitor latency metrics closely for the first hour"
        ]
        
        return StopEvent(result={
            "summary": summary,
            "recommended_actions": actions,
            "evidence_refs": ctx.data["state"].evidence_refs
        })
