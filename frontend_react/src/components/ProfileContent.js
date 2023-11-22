import React, { useEffect, useState } from "react";
import Post from '../components/Post';
function ProfileContent({ posts, setPosts }) {



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
