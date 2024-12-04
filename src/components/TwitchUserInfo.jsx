import React, { useState, useEffect } from 'react';

const TwitchUserInfo = ({ userInfo, handleLogout }) => {
    const [userData, setUserData] = useState(userInfo);

    useEffect(() => {
        setUserData(userInfo);
    },[userInfo]);
    
    return (
        <>
        {!userData ? (
            <p>Loading...</p>
        ) : (
            <div className={'global-user user-' + userInfo.id}>
            <img src={userInfo.profile_image_url} alt="User Avatar" style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
            <h2>Welcome, {userInfo.display_name}!</h2>
            <button onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px" }}>Logout</button>
            </div>
        )}
        </>
    )
}

export default TwitchUserInfo