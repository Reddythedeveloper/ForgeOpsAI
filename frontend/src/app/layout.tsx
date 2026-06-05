'use client';

import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="sidebar-logo">F</div>
              <div className="sidebar-title">ForgeOps AI</div>
            </div>
            
            <nav className="sidebar-nav">
              <a href="/" className={`sidebar-link ${isActive('/')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Copilot Chat
              </a>
              <a href="/investigations" className={`sidebar-link ${isActive('/investigations')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Investigations
              </a>
              <a href="/models" className={`sidebar-link ${isActive('/models')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                Model Registry
              </a>
              <a href="/prompts" className={`sidebar-link ${isActive('/prompts')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Prompt Catalog
              </a>
            </nav>

            <div className="sidebar-footer">
              <div className="user-avatar">AI</div>
              <div className="user-info">
                <span className="user-name">Uday</span>
                <span className="user-role">AI Engineer</span>
              </div>
            </div>
          </aside>
          
          <main className="main-content">
            <header className="header">
              <div className="header-title">
                {pathname === '/' && "Investigation Workspace"}
                {pathname === '/investigations' && "Historical Investigations"}
                {pathname === '/models' && "Model Registry"}
                {pathname === '/prompts' && "Prompt Catalog"}
              </div>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => alert("The 'New Workflow' modal will be available in the next release.")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New Workflow
              </button>
            </header>
            <div className="container">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
