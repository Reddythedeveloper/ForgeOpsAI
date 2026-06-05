'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello. I am the ForgeOps AI Copilot. How can I help you investigate your models today?',
    }
  ]);
  const [input, setInput] = useState('');
  const [evidence, setEvidence] = useState<any[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    
    // Simulate AI response with evidence
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I investigated the drift alert for the fraud-v2 model. Precision declined after feature distribution shifted in the `merchant_region`. Based on the runbook, you should re-run the backfill simulation tool.'
      }]);
      
      setEvidence([
        { type: 'metric', title: 'fraud-v2 Weekly Metrics', detail: 'Precision: 0.88 (-0.04)' },
        { type: 'alert', title: 'Active Alert', detail: 'Drift detected in merchant_region' },
        { type: 'runbook', title: 'runbook_fraud_v2_drift', detail: 'If precision drops below 0.90...' }
      ]);
    }, 1500);
    
    setInput('');
  };

  return (
    <>
      <section className="chat-section">
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-bubble">
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSend} style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <input 
            className="input" 
            placeholder="Ask about a model, drift, or incident..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="btn">Send</button>
        </form>
      </section>

      <aside className="evidence-drawer">
        <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Investigation Evidence</h4>
        
        {evidence.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No evidence gathered yet.</p>
        ) : (
          evidence.map((ev, i) => (
            <div key={i} className="evidence-item">
              <div className="evidence-title">
                <span className="badge">{ev.type}</span>
                {ev.title}
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                {ev.detail}
              </div>
            </div>
          ))
        )}
      </aside>
    </>
  );
}
