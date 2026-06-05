import os
import sys

# Add the project root to the python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from backend.app.services.retrieval_service import RetrievalService

def seed_qdrant():
    service = RetrievalService()
    
    runbooks = [
        {
            "id": "runbook_fraud_v2_drift",
            "text": "# Fraud-v2 Drift Remediation\n\nIf precision drops below 0.90, check the feature distribution for `merchant_region`. Often this shifts when a new region is added. Re-run the backfill simulation tool to estimate impact before retraining.",
            "metadata": {"type": "runbook", "model": "fraud-v2", "topic": "drift"}
        },
        {
            "id": "incident_42",
            "text": "# Incident 42: Latency Spike in eu-west-1\n\nThe fraud-v2 model experienced a latency spike (avg 250ms) on May 12 due to a Redis cache miss storm. Mitigated by scaling read replicas.",
            "metadata": {"type": "incident", "model": "fraud-v2", "topic": "latency", "severity": "high"}
        },
        {
            "id": "runbook_churn_prod_release",
            "text": "# Churn Model Release Checklist\n\nBefore deploying `churn-prod`, ensure:\n1. Offline AUC > 0.85\n2. Canary error rate < 1%\n3. Feature pipeline is deployed to production.",
            "metadata": {"type": "runbook", "model": "churn-prod", "topic": "deployment"}
        }
    ]
    
    print("Indexing documents into Qdrant...")
    service.index_documents(runbooks)
    print("Seeding complete.")

if __name__ == "__main__":
    seed_qdrant()
