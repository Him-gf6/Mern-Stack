import React, { useState } from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PartnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://https://mern-stack-backend-zoum.onrender.com/api/auth/loginfoodpartner', { email, password }, { withCredentials: true });

    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    }

    navigate('/CreateFood');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <span className="partner-badge">Partner Program</span>
          <div className="auth-logo">🏪</div>
          <h1 className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Manage your restaurant</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="john@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-checkbox">
            <input type="checkbox" id="partner-remember" />
            <label htmlFor="partner-remember">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>

          <div className="form-divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          <button type="button" className="btn btn-secondary">
            📱 Sign in with Google
          </button>
        </form>

        <div className="auth-footer">
          <div style={{ marginBottom: '12px' }}>
            <a href="/foodpartner/register">Register your restaurant</a>
          </div>
          <div>
            <a href="#">Forgot your password?</a>
          </div>
          <div style={{ fontSize: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            Looking to order food?{' '}
            <a href="/user/login">Login as User</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerLogin;
