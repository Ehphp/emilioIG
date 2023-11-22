import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from "../features/authSlice";



const DeleteUserButton = ({ userId }) => {
    const navigate = useNavigate();
    const deleteUser = async () => {
        try {
            const url = `http://localhost:4000/user/${userId}`
            const response = await axios.delete(url);
            console.log('User deleted successfully', response.data);
            navigate('/feed')
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <button className='deleteUserBtn' onClick={deleteUser}></button>
    );
};

export default DeleteUserButton;
