from llama_index.core.workflow import Workflow, StartEvent, StopEvent, step, Context
from workflows.common.events import SetupEvent, EvidenceGatheredEvent, SynthesisCompleteEvent
from workflows.common.state import InvestigationState
from backend.app.schemas.investigation import EvidenceBundle, RetrievedDoc, ToolOutput
from backend.app.services.retrieval_service import RetrievalService
# In a real setup, we would use an MCP Client to call server tools. Here we mock it.

class DriftInvestigationWorkflow(Workflow):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.retrieval_service = RetrievalService()
        
    @step
    async def parse_request(self, ctx: Context, ev: StartEvent) -> SetupEvent:
        """Parse request to resolve entities."""
        ctx.data["state"] = InvestigationState()
        state = ctx.data["state"]
        
        # Simple extraction for demo purposes
        req = ev.get("request", {})
        state.question = req.get("question", "Why did precision drop?")
        state.model = req.get("model", "unknown-model")
        state.time_window = req.get("time_window", "7d")
        
        print(f"[Drift] Parsed request for model {state.model}")
        return SetupEvent(
            model=state.model,
            time_window=state.time_window,
            question=state.question
        )

    @step
    async def gather_evidence(self, ctx: Context, ev: SetupEvent) -> EvidenceGatheredEvent:
        """Load resources, call tools, retrieve documents."""
        state = ctx.data["state"]
        print(f"[Drift] Gathering evidence for {ev.model}")
        
        # 1. MCP Resources (Mock)
        resources = [
            f"metrics://models/{ev.model}/weekly",
            f"alerts://drift/{ev.model}"
        ]
        
        # 2. MCP Tools (Mock)
        tools = [
            ToolOutput(
                tool_name="compare_model_versions", 
                result={"winner": "v1", "improvement_pct": -4.5}
            )
        ]
        
        # 3. Retrieval
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
        """Sample final synthesis."""
        print("[Drift] Synthesizing evidence...")
        # In reality, you would pass ev.bundle.to_prompt_context() to an LLM
        
        summary = "Precision declined after feature distribution shifted. " \
                  "Retrieved runbooks suggest this is likely due to the new region deployment."
        actions = [
            "Review recent feature pipeline changes",
            "Re-run backfill simulation on the latest 7-day slice"
        ]
        
        return StopEvent(result={
            "summary": summary,
            "recommended_actions": actions,
            "evidence_refs": ctx.data["state"].evidence_refs
        })
