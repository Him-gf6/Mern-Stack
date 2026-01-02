import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer(){
  const loc = useLocation();
  return (
    <nav className="app-footer">
      <Link to="/" className={`footer-item ${loc.pathname === '/' ? 'active' : ''}`} aria-label="Home">
        <div className="footer-icon">🏠</div>
        <div className="footer-label">Home</div>
      </Link>

      <Link to="/saved" className={`footer-item ${loc.pathname === '/saved' ? 'active' : ''}`} aria-label="Saved">
        <div className="footer-icon">🔖</div>
        <div className="footer-label">Saved</div>
      </Link>
    </nav>
  )
}
