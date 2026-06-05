export default function ModelsPage() {
  return (
    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
      <h2>Model Registry</h2>
      <p style={{ color: 'var(--text-muted)' }}>Overview of all registered models and their status.</p>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
          fraud-v2 <span className="badge" style={{ backgroundColor: 'var(--success)' }}>Production</span>
        </h3>
        <p>Lineage: MLflow Experiment #churn-prod</p>
        <p>Owner: fraud-team@example.com</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn">View Metrics</button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
          churn-prod <span className="badge" style={{ backgroundColor: 'var(--warning)' }}>Canary (10%)</span>
        </h3>
        <p>Lineage: MLflow Experiment #churn-prod</p>
        <p>Owner: growth-team@example.com</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn">View Readiness Report</button>
        </div>
      </div>
    </div>
  );
}
