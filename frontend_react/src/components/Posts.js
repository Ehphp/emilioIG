import React, { useState } from 'react';
import Post from './Post';

function Posts({ initialPosts }) {
    const [posts, setPosts] = useState(initialPosts);
    const updateLikes = (postId, newLikes) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: newLikes } : post
        ));
    };

    const deletePost = (postId) => {
        console.log('delete post Posts', postId);
        setPosts(posts.filter(post => post.id !== postId));
    };


    return (
        <div className='postsList'>
            {posts.map(post => (
                <Post key={post.id}
                    post={post}
                    updateLikes={updateLikes}
                    deletePost={deletePost}
                    initialPosts={initialPosts}
                />
            ))}
        </div>
    );
}

export default Posts;
