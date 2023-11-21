
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

import Post from '../components/Post';

function Feed() {
    const user = useSelector((state) => state.auth.user);
    const userId = user.id;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);


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

export default Feed;
