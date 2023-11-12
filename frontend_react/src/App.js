import React, { useEffect } from 'react';
import axios from 'axios';

function App() {

    const [user, setUser] = React.useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/40`);

                setUser(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>{user.username} {user.password}  {user.email}</p>
        </div>
    );
}

export default App;
