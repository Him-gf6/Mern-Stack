import React, { useState } from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://https://mern-stack-backend-zoum.onrender.com/api/auth/login', { email, password }, { withCredentials: true });

    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    }

    navigate('/');

  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <div className="auth-logo">👤</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="john@example.com"
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
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
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
            <a href="/user/register">Create an account</a>
          </div>
          <div>
            <a href="#">Forgot your password?</a>
          </div>
          <div style={{ fontSize: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            Are you a restaurant owner?{' '}
            <a href="/foodpartner/login">Login as Partner</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
