export default function PromptsPage() {
  return (
    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
      <h2>Prompt Catalog</h2>
      <p style={{ color: 'var(--text-muted)' }}>Governed templates for AI operations.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="card">
          <h4>incident_postmortem</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Drafts an incident postmortem from alerts and logs.</p>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', backgroundColor: 'var(--background)', padding: '0.5rem', borderRadius: '4px' }}>
            Version: 1.2
          </div>
        </div>
        
        <div className="card">
          <h4>drift_triage</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Generates root-cause hypotheses for model drift.</p>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', backgroundColor: 'var(--background)', padding: '0.5rem', borderRadius: '4px' }}>
            Version: 2.0
          </div>
        </div>
        
        <div className="card">
          <h4>release_readiness</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Go/no-go checklist for model deployments.</p>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', backgroundColor: 'var(--background)', padding: '0.5rem', borderRadius: '4px' }}>
            Version: 1.0
          </div>
        </div>
      </div>
    </div>
  );
}
