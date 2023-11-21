import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:4000/signup/user';

        try {
            const response = await axios.post(url, { username, email, password });

            console.log('Sign Up Successful', response.data);

            navigate('/login')

        } catch (error) {
            if (error.response) {
                console.error('Sign Up Failed', error.response.data);
            } else if (error.request) {
                console.error('No response received', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    return (
        <form className='content' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
