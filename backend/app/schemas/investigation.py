from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class RetrievedDoc(BaseModel):
    doc_id: str
    content: str
    score: float
    metadata: Dict[str, Any] = Field(default_factory=dict)

class ToolOutput(BaseModel):
    tool_name: str
    result: Any

class EvidenceBundle(BaseModel):
    question: str
    resources: List[str] = Field(default_factory=list, description="List of MCP resource URIs")
    tool_outputs: List[ToolOutput] = Field(default_factory=list, description="Outputs from MCP tools")
    retrieved_docs: List[RetrievedDoc] = Field(default_factory=list, description="Documents from vector store")
    
    def to_prompt_context(self) -> str:
        """Format the bundle as context for a LLM."""
        context = f"Question: {self.question}\n\n"
        
        if self.resources:
            context += "Resources Referenced:\n"
            for res in self.resources:
                context += f"- {res}\n"
            context += "\n"
            
        if self.tool_outputs:
            context += "Diagnostic Tool Outputs:\n"
            for out in self.tool_outputs:
                context += f"[{out.tool_name}]: {out.result}\n"
            context += "\n"
            
        if self.retrieved_docs:
            context += "Retrieved Operational Context (Runbooks/Incidents):\n"
            for doc in self.retrieved_docs:
                context += f"--- Document ID: {doc.doc_id} (Score: {doc.score:.2f}) ---\n"
                context += f"{doc.content}\n\n"
                
        return context
