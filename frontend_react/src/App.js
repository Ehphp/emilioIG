import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Feed from './pages/Feed';
import './index.css';
import Profile from './pages/Profile'
import Logout from './components/Logout';
import CreatePost from './components/CreatePost';
import { useSelector } from 'react-redux';



function App() {
    // const user = {
    //     username: 'emilio',
    //     email: 'emilio@emilio.com',
    //     profilePicture: 'https://r2.starryai.com/results/459516412/766a18ad-b149-4895-9363-78c6714d3e7d.webp'
    // };
    const user = useSelector((state) => state.auth.user);

    return (
        <Router>
            <Navbar user={user} />

            <div >
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/feed' element={<Feed />} />

                    <Route path='/create' element={<CreatePost />} />
                    <Route path="/profile/:userId" element={<Profile />} />

                    <Route path='/logout' element={<Logout />} />
                    <Route path='/profile' element={<Profile />} />

                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                </Routes>


            </div>

        </Router>
    );
}

export default App;
