import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileHeader from "../components/ProfileHeader";
import ProfileContent from "../components/ProfileContent";
import axios from 'axios';

function Profile() {
    const globalUser = useSelector((state) => state.auth.user);
    const { userId: urlUserId } = useParams();
    const userId = urlUserId || globalUser.id;
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:4000/user/${userId}`)
                .then(response => {
                    setUser(response.data);
                    return axios.get(`http://localhost:4000/user/${userId}/posts`);
                })
                .then(response => setPosts(response.data))
                .catch(error => console.error('Error fetching data: ', error));
        }
    }, [userId]);

    if (!user) return null;

    return (
        <>
            <ProfileHeader user={user} />
            <ProfileContent posts={posts} setPosts={setPosts} />
        </>
    );
}

export default Profile;
