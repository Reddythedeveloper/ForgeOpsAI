export default function InvestigationsPage() {
  return (
    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
      <h2>Investigations</h2>
      <p style={{ color: 'var(--text-muted)' }}>Historical logs of automated AI investigations.</p>
      
      <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>Target</th>
            <th style={{ padding: '1rem' }}>Type</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '1rem' }}>inv_1024</td>
            <td style={{ padding: '1rem' }}>fraud-v2</td>
            <td style={{ padding: '1rem' }}>Drift Triage</td>
            <td style={{ padding: '1rem' }}><span className="badge">Resolved</span></td>
            <td style={{ padding: '1rem' }}>Today</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '1rem' }}>inv_1023</td>
            <td style={{ padding: '1rem' }}>churn-prod</td>
            <td style={{ padding: '1rem' }}>Release Readiness</td>
            <td style={{ padding: '1rem' }}><span className="badge">Completed</span></td>
            <td style={{ padding: '1rem' }}>Yesterday</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
