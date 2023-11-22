import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function DeletePostBtn({ authorId, postId, onDeleteSuccess }) {
    const user = useSelector((state) => state.auth.user);


    const handleDelete = async () => {
        if (user.id !== authorId) {
            toast.error('🦄Operazione non autorizzata: l\'utente non è l\'autore del post!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); console.error("Operazione non autorizzata: l'utente non è l'autore del post");

            return
        }
        const token = sessionStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:4000/post/${postId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            onDeleteSuccess(postId);
        } catch (error) {
            console.error('Error elimination post:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Elimina Post</button>
    );
}
export default DeletePostBtn;
