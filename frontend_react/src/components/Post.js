import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';

import Author from './Author';
import CommentList from "./CommentList";
import LikeBtn from "./LikeBtn";
import AddComment from "./AddComment";
import DeletePostBtn from './DeletePostBtn';


function Post({ post, updateLikes, onDeletePost }) {
    const [comments, setComments] = useState([]);
    // const user = useSelector((state) => state.auth.user);


    useEffect(() => {
        axios.get(`http://localhost:4000/post/comments/${post.id}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [post.id]);

    const addComment = (newComment) => {
        setComments([...comments, newComment]);
    };

    const onDeleteSuccess = (postId) => {
        onDeletePost(postId);
    }

    return (
        <div className='card'>
            <Author authorId={post.authorId} />
            <DeletePostBtn postId={post.id}
                onDeleteSuccess={onDeleteSuccess}
                authorId={post.authorId} />
            <img className='imgContentPost'
                src={post.imgSrc}
                alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div>
                <LikeBtn postId={post.id}
                    updateLikes={updateLikes}
                    currentLikes={post.likes} />
                <p>{post.likes.length}</p>
            </div>
            <AddComment postId={post.id} onCommentAdded={addComment} />
            <CommentList comments={comments} />
        </div>
    );
}

export default Post;

