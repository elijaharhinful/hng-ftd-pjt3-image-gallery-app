import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      UserName: 'user@example.com',
      Password: '1Password',
    };

    if (username === user.UserName && password === user.Password) {
      navigate('/gallery');
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  // Clear error message when either input field changes
  const handleInputChange = () => {
    setErrorMsg('');
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className='login-form'>
      <p className='errormsg'>{errormsg}</p>
        <h1>Log In</h1>
        
          <input
            type="email"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
              handleInputChange();
            }}
            placeholder='Username'
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            placeholder='Password'
            required
          />
        <div>
          <button type="submit" className='button'>Submit</button>
        </div>
      </form>
    </div>
  );
}
