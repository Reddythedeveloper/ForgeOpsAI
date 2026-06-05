export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div className="sidebar-title">ForgeOps AI</div>
            <nav className="sidebar-nav">
              <a href="/" className="sidebar-link active">Chat Copilot</a>
              <a href="/investigations" className="sidebar-link">Investigations</a>
              <a href="/models" className="sidebar-link">Model Registry</a>
              <a href="/prompts" className="sidebar-link">Prompt Catalog</a>
            </nav>
          </aside>
          
          <main className="main-content">
            <header className="header">
              <h3>Investigation Workspace</h3>
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
