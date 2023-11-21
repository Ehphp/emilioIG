import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('authorId', user.id);
        if (image) {
            formData.append('image', image);
        }
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:4000/post', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            navigate('/profile')

            console.log(response.data);
        } catch (error) {
            console.error('Error creating post: ', error);
        }
    };

    return (
        <div className='divCreatePost'>
            <form className='formCreatePost' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Inserisci titolo'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Inserisci descrizione'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Crea Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
