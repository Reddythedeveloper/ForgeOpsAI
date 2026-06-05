import os
from typing import List, Dict, Any
from qdrant_client import QdrantClient
from llama_index.core import Document, VectorStoreIndex
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core.storage.storage_context import StorageContext
from backend.app.schemas.investigation import RetrievedDoc

class RetrievalService:
    def __init__(self):
        self.qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
        self.collection_name = "forgeops_runbooks"
        
        try:
            self.client = QdrantClient(url=self.qdrant_url)
            self.vector_store = QdrantVectorStore(
                client=self.client, 
                collection_name=self.collection_name
            )
            self.storage_context = StorageContext.from_defaults(vector_store=self.vector_store)
        except Exception as e:
            print(f"Warning: Could not connect to Qdrant: {e}")
            self.client = None
            
    def index_documents(self, documents: List[Dict[str, Any]]):
        """Index a list of dictionaries containing 'text', 'id', and 'metadata'."""
        if not self.client:
            return
            
        llama_docs = []
        for doc in documents:
            llama_doc = Document(
                text=doc.get("text", ""),
                doc_id=doc.get("id"),
                metadata=doc.get("metadata", {})
            )
            llama_docs.append(llama_doc)
            
        index = VectorStoreIndex.from_documents(
            llama_docs, 
            storage_context=self.storage_context
        )
        return index

    def retrieve(self, query: str, top_k: int = 3) -> List[RetrievedDoc]:
        """Retrieve top_k documents related to the query."""
        if not self.client:
            return []
            
        # Check if collection exists
        try:
            self.client.get_collection(self.collection_name)
        except Exception:
            return []
            
        index = VectorStoreIndex.from_vector_store(
            vector_store=self.vector_store
        )
        
        retriever = index.as_retriever(similarity_top_k=top_k)
        nodes = retriever.retrieve(query)
        
        results = []
        for node in nodes:
            results.append(RetrievedDoc(
                doc_id=node.node.node_id,
                content=node.node.text,
                score=node.score if node.score is not None else 0.0,
                metadata=node.node.metadata
            ))
            
        return results
