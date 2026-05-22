import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [serverStatus, setServerStatus] = useState('checking...')
  const [loading, setLoading] = useState(true)
  const apiBaseUrl = import.meta.env.VITE_API_URL || ''

  const [messages, setMessages] = useState([])
  const [msgLoading, setMsgLoading] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [posting, setPosting] = useState(false)

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

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMessages() {
    setMsgLoading(true)
    try {
      const res = await fetch(`${apiBaseUrl}/api/messages?limit=50`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (err) {
      console.error('Failed to fetch messages', err)
      setMessages([])
    } finally {
      setMsgLoading(false)
    }
  }

  async function handleSend(e) {
    e.preventDefault()
    if (!messageText || posting) return
    setPosting(true)
    try {
      const res = await fetch(`${apiBaseUrl}/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      })
      const json = await res.json()
      if (json && json.success) {
        setMessageText('')
        // refresh list
        fetchMessages()
      } else {
        console.error('Failed to post message', json)
      }
    } catch (err) {
      console.error('Failed to post message', err)
    } finally {
      setPosting(false)
    }
  }

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

        <section className="card">
          <h2>Messages</h2>
          <form className="message-form" onSubmit={handleSend}>
            <input
              aria-label="message"
              placeholder="Type a message..."
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
            />
            <button type="submit" disabled={posting || !messageText}>{posting ? 'Sending…' : 'Send'}</button>
          </form>

          {msgLoading ? (
            <p className="checking">Loading messages…</p>
          ) : (
            <div className="messages-list">
              {messages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                messages.map(m => (
                  <div className="message-item" key={m.id}>
                    <div className="message-body">{m.message}</div>
                    <div className="message-meta">{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ | Production-ready monorepo setup</p>
      </footer>
    </div>
  )
}

export default App
