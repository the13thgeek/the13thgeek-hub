import React from 'react';

const TwitchLogin = () => {
    const handleLogin = () => {
        const redirectUri = `${window.location.origin}${window.location.pathname}`;
        const authURL = `https://id.twitch.tv/oauth2/authorize?client_id=${import.meta.env.VITE_TWITCH_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=user:read:email`;
        window.location.href = authURL;
    }

    return (
        <div>
            <p>Join in the fun!</p>
            <button onClick={handleLogin} className='twitch-color' style={{ padding: "10px 20px", fontSize: "16px" }}>
                Login with Twitch
            </button>
        </div>
    )
}

export default TwitchLogin