import React, { useState } from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PartnerRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');


  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:3000/api/auth/registerfoodpartner', {
      name, email, password, businessName, address
    },{ withCredentials:true});

    navigate('/CreateFood');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <span className="partner-badge">Partner Program</span>
          <div className="auth-logo">🏪</div>
          <h1 className="auth-title">Register Restaurant</h1>
          <p className="auth-subtitle">Start your journey as a food partner</p>
        </div>

        <form className="auth-form" onSubmit={handlesubmit}>          <div className="form-group">
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

          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Rahul Foods"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="Delhi, India"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>


          <div className="form-checkbox">
            <input type="checkbox" id="partner-terms" />
            <label htmlFor="partner-terms">
              I agree to the Partner Terms & Conditions
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Register Restaurant
          </button>
        </form>

        <div className="auth-footer">
          <div style={{ marginBottom: '12px' }}>
            Already have an account?{' '}
            <a href="/foodpartner/login">Sign In</a>
          </div>
          <div style={{ fontSize: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            Looking to order food?{' '}
            <a href="/user/register">Register as User</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerRegister;