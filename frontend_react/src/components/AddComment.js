import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddComment({ postId, onCommentAdded }) {
    const [comment, setComment] = useState("");
    const userId = useSelector((state) => state.auth.user.id);

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:4000/comment';
            const response = await axios.post(url, { content: comment, userId, postId });
            const newComment = response.data.comment;

            onCommentAdded(newComment);
            setComment("");
        } catch (error) {
            console.log('commento non inserito', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type='text' placeholder='Inserisci commento' className='addCommentInput' value={comment} onChange={handleInputChange} />
            <button type="submit">Aggiungi Commento</button>
        </form>
    );
}

export default AddComment;
