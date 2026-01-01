import React, { useState } from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:3000/api/auth/register', {
      name, email, password
    },{ withCredentials:true});

    navigate('/');
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <div className="auth-logo">👤</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us to find your favorite food</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the Terms & Conditions
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>

          <div className="form-divider">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          <button type="button" className="btn btn-secondary">
            📱 Sign up with Google
          </button>
        </form>

        <div className="auth-footer">
          <div style={{ marginBottom: '12px' }}>
            Already have an account?{' '}
            <a href="/user/login">Sign In</a>
          </div>
          <div style={{ fontSize: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            Are you a restaurant owner?{' '}
            <a href="/foodpartner/register">Register as Partner</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
