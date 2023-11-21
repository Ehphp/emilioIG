import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Post from '../components/Post';

function ProfileContent() {
    const globalUser = useSelector((state) => state.auth.user);
    const { userId: urlUserId } = useParams();
    const userId = urlUserId || globalUser.id;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/user/${userId}/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, [userId]);

    const updateLikes = (postId, newLikes) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return { ...post, likes: newLikes };
            }
            return post;
        }));
    };

    const onDeletePost = (postId) => {
        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    };

    return (
        <>
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    updateLikes={updateLikes}
                    onDeletePost={onDeletePost}
                />
            ))}
        </>
    );
}

export default ProfileContent;
