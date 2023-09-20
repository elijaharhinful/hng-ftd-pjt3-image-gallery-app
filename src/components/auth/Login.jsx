import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        navigate('/gallery');
      }).catch((error) => {
        console.log(error)
        setErrorMsg("Invalid Login credentials");
      })
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
        <p>You need to login to use DND Galleria</p>
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
