import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:4000/login';

    try {
      const response = await axios.post(url, { email, password });
      const data = response.data;

      console.log('Login Successful', data.user, data.token);

      sessionStorage.setItem('token', data.token);

      dispatch(setCredentials({ user: data.user }));

      navigate('/profile');
    } catch (error) {
      if (error.response) {
        toast.error('Login Failed: ' + error.message);
      } else if (error.request) {
        toast.error('La richiesta è stata inviata ma nessuna risposta è stata ricevuta');
      } else {
        toast.error('Qualcosa è andato storto: ' + error.message);
      }

    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form className='content' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button type="submit">Login</button>
      <ToastContainer />
    </form>
  );
};

export default Login;
