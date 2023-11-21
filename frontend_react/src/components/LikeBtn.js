import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function LikeBtn({ postId, updateLikes, currentLikes }) {
    const user = useSelector((state) => state.auth.user);


    let buttonText = 'Like';
    for (let like of currentLikes) {
        if (like.userId === user.id) {
            buttonText = 'Unlike';
            break;

        }
    }
    const handleLike = async () => {
        try {
            const userLike = currentLikes.find(like => like.userId === user.id);

            let isLikedByCurrentUser;
            if (userLike !== undefined) {
                isLikedByCurrentUser = true;
            } else {
                isLikedByCurrentUser = false;
            }


            let likeId;
            if (isLikedByCurrentUser) {
                likeId = userLike.id;
            } else {
                likeId = null;
            }


            if (isLikedByCurrentUser && likeId) {
                await axios.delete(`http://localhost:4000/like/${likeId}`);
                updateLikes(postId, currentLikes.filter(like => like.id !== likeId));
            } else {
                const response = await axios.post(`http://localhost:4000/like/${postId}/${user.id}`);
                updateLikes(postId, [...currentLikes, response.data.like]);
            }
        } catch (error) {
            console.error('Errore nel gestire il like:', error);
        }
    };

    return (
        <button onClick={handleLike}>
            {buttonText}
        </button>
    );
}

export default LikeBtn;
