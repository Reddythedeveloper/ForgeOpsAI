'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello. I am the ForgeOps AI Copilot. I can inspect model health, read experiment metadata, and trigger safe operational actions. How can I help you investigate your models today?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [evidence, setEvidence] = useState<any[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI reasoning and response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I investigated the drift alert for the `fraud-v2` model. The telemetry shows that precision declined after the feature distribution shifted in `merchant_region`. Based on the runbook, I recommend re-running the backfill simulation tool before proceeding with retraining.'
      }]);
      
      setEvidence([
        { type: 'resource', tag: 'metrics', title: 'fraud-v2 Weekly Metrics', detail: 'Precision: 0.88 (declined from 0.92)\nRecall: 0.86\nTraffic: Normal' },
        { type: 'tool', tag: 'alerts', title: 'open_alert_bundle', detail: '{"active_alerts": ["Drift detected in merchant_region feature slice"]}' },
        { type: 'retrieval', tag: 'runbook', title: 'runbook_fraud_v2_drift', detail: 'If precision drops below 0.90, check feature distribution for `merchant_region`... Re-run backfill simulation tool to estimate impact.' }
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  };

  return (
    <>
      <section className="chat-wrapper">
        <div className="chat-history">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'assistant' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                )}
              </div>
              <div className="message-content">
                <div className="message-name">{msg.role === 'assistant' ? 'ForgeOps Copilot' : 'You'}</div>
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="message assistant">
               <div className="message-avatar">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
               </div>
               <div className="message-content">
                 <div className="message-name">ForgeOps Copilot</div>
                 <div className="message-bubble" style={{ display: 'flex', gap: '4px', alignItems: 'center', minHeight: '44px' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
                    <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.2s' }}></span>
                    <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.4s' }}></span>
                 </div>
               </div>
             </div>
          )}
          <div ref={bottomRef} />
        </div>
        
        <div className="chat-input-container">
          <form className="chat-input-box" onSubmit={handleSend}>
            <textarea 
              className="chat-input" 
              placeholder="Ask about a model, drift, or investigate an incident..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onEnterPress}
              rows={1}
            />
            <button type="submit" className="chat-submit" disabled={!input.trim() || isTyping}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      </section>

      <aside className="evidence-drawer">
        <div className="evidence-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Context & Evidence
        </div>
        <div className="evidence-content">
          {evidence.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinelinejoin="round" style={{ margin: '0 auto 1rem', opacity: 0.5 }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <p>No operational context gathered yet.</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>Ask a question to trigger MCP tools and resource retrieval.</p>
            </div>
          ) : (
            evidence.map((ev, i) => (
              <div key={i} className="evidence-item">
                <div className="evidence-meta">
                  <span className={`badge badge-${ev.type === 'tool' ? 'warning' : ev.type === 'resource' ? 'success' : 'primary'}`}>{ev.tag}</span>
                </div>
                <div className="evidence-title" style={{ marginBottom: '0.5rem' }}>{ev.title}</div>
                <div className="evidence-detail" style={{ whiteSpace: 'pre-wrap' }}>
                  {ev.detail}
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
