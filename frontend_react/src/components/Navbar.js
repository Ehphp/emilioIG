import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchUser from './SearchUser';
function Navbar() {
    const user = useSelector((state) => state.auth.user);

    return (
        <nav className='nav'>
            <h1>Instagram</h1>
            <div className='link'>

                {!user ? (
                    <>

                        <Link to="/"></Link>
                        <Link to="/signup">Registrati</Link>
                        <Link to="/login">Login</Link>

                    </>
                ) : (<>
                    <Link to="/create">Creapost</Link>
                    <Link to="/feed">Home</Link>

                    <Link to="/profile">Profilo</Link>
                    <Link to="/logout">Logout</Link></>

                )}
                <SearchUser />
            </div>
        </nav>
    );
}

export default Navbar;
