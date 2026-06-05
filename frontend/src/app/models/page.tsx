export default function ModelsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Model Registry</h2>
        <p className="page-description">Overview of all registered models, their deployment stages, and operational health.</p>
      </div>
      
      <div className="grid-cards">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">fraud-v2</h3>
            <span className="badge badge-success">Production</span>
          </div>
          <div className="card-body">
            <p><strong>Lineage:</strong> MLflow Experiment #fraud-v2</p>
            <p><strong>Owner:</strong> fraud-team@example.com</p>
            <p><strong>Last Updated:</strong> 2 days ago</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              View Metrics
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">churn-prod</h3>
            <span className="badge badge-warning">Canary (10%)</span>
          </div>
          <div className="card-body">
            <p><strong>Lineage:</strong> MLflow Experiment #churn-prod</p>
            <p><strong>Owner:</strong> growth-team@example.com</p>
            <p><strong>Last Updated:</strong> 5 hours ago</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Readiness Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
