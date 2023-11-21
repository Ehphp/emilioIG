import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfileHeader() {
    const globalUser = useSelector((state) => state.auth.user);
    const { userId: urlUserId } = useParams();
    const userId = urlUserId || globalUser.id;

    console.log(userId);
    const [user, setUser] = useState(null);
    const defaultImage = 'https://r2.starryai.com/results/280439566/b2af7633-b240-469e-8a0b-8967ca847fc1.webp';

    useEffect(() => {
        console.log('URL UserId:', urlUserId);
        console.log('Global User Id:', globalUser.id);
        if (userId) {
            axios.get(`http://localhost:4000/user/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error('Error fetching user: ', error));
        }
    }, [userId]);

    if (!user) return null;

    return (
        <div className='profileHeader'>
            <div className='imgProfileProfile'>
                <img src={user.imgSrc || defaultImage} alt={user.username} />
            </div>
            <div>
                <h1>{user.username}</h1>
                <h2>Follower: {user.followers.length}</h2>
                <h3>Following: {user.following.length}</h3>
            </div>
        </div>
    );
}

export default ProfileHeader;
