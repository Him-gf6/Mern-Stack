import React, { useEffect, useState } from 'react'
import '../styles/saved.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Saved() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // fetch saved items for authenticated user from backend
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.get('http://localhost:3000/api/fooditems/saved', { withCredentials: true, headers })
      .then((res) => {
        setItems(res.data.saved || [])
      })
      .catch((err) => {
        console.error('Failed to fetch saved items', err?.response?.data || err)
        setItems([])
      })
  }, [])

  const remove = (id) => {
    // call backend to unsave (POST /save toggles saved state)
    // call backend to unsave (include Authorization header if available)
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.post('http://localhost:3000/api/fooditems/save', { foodId: id }, { withCredentials: true, headers })
      .then(() => {
        setItems(prev => prev.filter(i => i._id !== id))
      })
      .catch(err => {
        console.error('Failed to remove saved item', err?.response?.data || err)
      })
  }

  if (!items || items.length === 0) return (
    <main className="saved-page">
      <div className="saved-empty">No saved videos yet.</div>
      <Link to="/" className="saved-back">Back to Home</Link>
    </main>
  )

  return (
    <main className="saved-page">
      <h2>Saved Videos</h2>
      <div className="saved-list">
        {items.map(it => (
          <article key={it._id} className="saved-card">
            <video className="saved-video" src={it.video} controls muted preload="metadata" />
            <div className="saved-meta">
              <h3 className="saved-name">{it.name}</h3>
              <p className="saved-desc">{it.description}</p>
              <div className="saved-actions">
                <button className="saved-remove" onClick={() => remove(it._id)}>Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Saved