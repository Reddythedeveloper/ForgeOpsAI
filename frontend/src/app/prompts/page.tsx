export default function PromptsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Prompt Catalog</h2>
        <p className="page-description">Governed prompt templates for repeatable AI operations workflows.</p>
      </div>
      
      <div className="grid-cards">
        <div className="card">
          <div className="card-header" style={{ marginBottom: '0.5rem' }}>
            <h4 className="card-title" style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.95rem', color: 'var(--primary)' }}>incident_postmortem</h4>
            <span className="badge badge-default">v1.2</span>
          </div>
          <div className="card-body">
            <p style={{ marginBottom: '1rem' }}>Drafts an incident postmortem from active alerts, log samples, and tool outputs.</p>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <code>Args: model, window, incident_id</code>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header" style={{ marginBottom: '0.5rem' }}>
            <h4 className="card-title" style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.95rem', color: 'var(--primary)' }}>drift_triage</h4>
            <span className="badge badge-default">v2.0</span>
          </div>
          <div className="card-body">
            <p style={{ marginBottom: '1rem' }}>Generates root-cause hypotheses for model drift based on distribution shifts.</p>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <code>Args: model, period</code>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header" style={{ marginBottom: '0.5rem' }}>
            <h4 className="card-title" style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.95rem', color: 'var(--primary)' }}>release_readiness</h4>
            <span className="badge badge-success">v1.0</span>
          </div>
          <div className="card-body">
            <p style={{ marginBottom: '1rem' }}>Generates a go/no-go checklist for model deployments using offline evaluation metrics.</p>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <code>Args: model_version, environment</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
