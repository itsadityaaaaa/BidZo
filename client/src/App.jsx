import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [serverStatus, setServerStatus] = useState('checking...')
  const [loading, setLoading] = useState(true)
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${apiBaseUrl}/health`)
      .then(res => res.json())
      .then(data => {
        setServerStatus(data.status)
        setLoading(false)
      })
      .catch(err => {
        console.error('Server connection failed:', err)
        setServerStatus('offline')
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>🎯 BidZo</h1>
        <p>Full-Stack Monorepo Application</p>
      </header>

      <main className="main">
        <section className="card">
          <h2>Frontend Status</h2>
          <p className="running">✅ React app running on port 3000</p>
          <p className="tech">Built with Vite + React 18</p>
        </section>

        <section className="card">
          <h2>Backend Status</h2>
          <p className={loading ? 'checking' : serverStatus === 'ok' ? 'running' : 'offline'}>
            {loading ? '⏳ Checking...' : serverStatus === 'ok' ? '✅ Express server online' : '❌ Server offline'}
          </p>
          <p className="tech">Running on port 5000</p>
        </section>

        <section className="card">
          <h2>Counter Demo</h2>
          <div className="counter">
            <button onClick={() => setCount(c => c - 1)}>−</button>
            <span>{count}</span>
            <button onClick={() => setCount(c => c + 1)}>+</button>
          </div>
        </section>

        <section className="card">
          <h2>Next Steps</h2>
          <ul>
            <li>Explore /client/src for React components</li>
            <li>Check /server for Express API routes</li>
            <li>Review /shared for shared utilities and types</li>
            <li>Run <code>npm run dev</code> to start both apps</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ | Production-ready monorepo setup</p>
      </footer>
    </div>
  )
}

export default App
