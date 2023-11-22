import React from 'react';
import DeleteUserButton from './DeleteUserBtn';
function ProfileHeader({ user }) {
    // const defaultImage = 'https://r2.starryai.com/results/72105747/79dca548-a7e7-46fa-ac5f-5233f1b90d99.webp';
    const userId = user.id
    return (
        <div className='profileHeader'>
            <div className='imgProfileProfile'>
                <img src={user.imgSrc} alt={user.username} />
                <DeleteUserButton userId={userId} />
            </div>
            <div>
                <h1>{user.username}</h1>
                <h2>Follower: {user.followers.length}</h2>
                <h3>Following: {user.following.length}</h3>
            </div>
        </div>
    );
}

export default ProfileHeader;
