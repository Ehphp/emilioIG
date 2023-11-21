import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Author from './Author';
import { useLocation } from 'react-router-dom';

function SearchUser() {
    const [searchUser, setSearchUser] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setSearchResults([]);
    }, [location.pathname]);

    const handleChange = (e) => {
        setSearchUser(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchUser) {
            console.log("Inserisci un nome utente per la ricerca.");
            return;
        }

        const url = `http://localhost:4000/user/${searchUser}`;
        try {
            const response = await axios.get(url);
            setSearchResults(response.data);
            setSearchUser("")
        } catch (error) {
            console.error("Errore durante la ricerca dell'utente:", error);
        }
    };

    return (<div className='searchUser'>
        <form className='searchUserForm' onSubmit={handleSubmit}>
            <input type="text" placeholder="Cerca utente" value={searchUser} onChange={handleChange} />
            <input type="submit" value="Cerca" />
        </form>
        <div className='searchUserDiv'>
            {searchResults.map(user => (
                <Author key={user.id} authorId={user.id} />
            ))}
        </div>
    </div>
    );


}

export default SearchUser;
