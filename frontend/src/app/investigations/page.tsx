export default function InvestigationsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Investigations</h2>
        <p className="page-description">Historical logs of automated AI investigations and generated reports.</p>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Target Model</th>
              <th>Workflow Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style={{ fontFamily: 'var(--font-mono)' }}>inv_1024</span></td>
              <td>fraud-v2</td>
              <td>Drift Triage</td>
              <td><span className="badge badge-success">Resolved</span></td>
              <td>Today, 10:45 AM</td>
              <td><button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View Report</button></td>
            </tr>
            <tr>
              <td><span style={{ fontFamily: 'var(--font-mono)' }}>inv_1023</span></td>
              <td>churn-prod</td>
              <td>Release Readiness</td>
              <td><span className="badge badge-primary">Completed</span></td>
              <td>Yesterday, 04:20 PM</td>
              <td><button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View Report</button></td>
            </tr>
            <tr>
              <td><span style={{ fontFamily: 'var(--font-mono)' }}>inv_1022</span></td>
              <td>fraud-v2</td>
              <td>Incident Draft</td>
              <td><span className="badge badge-error">Needs Review</span></td>
              <td>May 12, 02:15 PM</td>
              <td><button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View Draft</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
