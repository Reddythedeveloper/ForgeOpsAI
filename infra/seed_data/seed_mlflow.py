import os
import mlflow
import random
from datetime import datetime, timedelta

def seed_mlflow():
    tracking_uri = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
    mlflow.set_tracking_uri(tracking_uri)
    
    print(f"Connecting to MLflow at {tracking_uri}...")
    
    models = ["fraud-v2", "churn-prod"]
    
    for model_name in models:
        try:
            experiment_id = mlflow.create_experiment(model_name)
        except Exception:
            experiment = mlflow.get_experiment_by_name(model_name)
            experiment_id = experiment.experiment_id if experiment else None

        if not experiment_id:
            print(f"Failed to setup experiment for {model_name}")
            continue

        print(f"Seeding runs for {model_name}...")
        
        # Create a few historical runs
        for i in range(3):
            with mlflow.start_run(experiment_id=experiment_id, run_name=f"run_v{i+1}"):
                mlflow.log_param("learning_rate", round(random.uniform(0.01, 0.1), 3))
                mlflow.log_param("max_depth", random.choice([5, 7, 9]))
                
                if model_name == "fraud-v2":
                    mlflow.log_metric("precision", round(random.uniform(0.85, 0.95), 3))
                    mlflow.log_metric("recall", round(random.uniform(0.80, 0.90), 3))
                else:
                    mlflow.log_metric("auc", round(random.uniform(0.80, 0.88), 3))
                    mlflow.log_metric("log_loss", round(random.uniform(0.3, 0.5), 3))
                    
                mlflow.set_tag("version", f"v{i+1}")
                mlflow.set_tag("status", "completed")

    print("MLflow seeding complete.")

if __name__ == "__main__":
    seed_mlflow()
