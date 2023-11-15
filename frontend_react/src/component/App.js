import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Errore nel recupero degli utenti:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            <ul>
                {users.map(user => (
                    <li><img src={user.imgSrc} />
                        {user.username}
                    </li>

                ))}

            </ul>

        </div>
    );
}

export default App;
