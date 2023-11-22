import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import middlewareErrorHandlingToast from './components/middlewareErrorHandlingToast'

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile'
import Logout from './components/Logout';
import CreatePost from './components/CreatePost';



function App() {

    const user = useSelector((state) => state.auth.user);

    return (<>
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
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    </>
    );
}

export default App;
