import React, { useState, useEffect } from 'react';
import TwitchUserInfo from './components/TwitchUserInfo';
import './App.scss';
import TwitchLogin from './components/TwitchLogin';

function App() {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("twitch_token");
        //const storedUserInfo = sessionStorage.getItem("twitch_user_info");

        if(storedToken) {
            setToken(storedToken);
        }

        const hash = window.location.hash;
        if(hash) {
            const urlParams = new URLSearchParams(hash.replace("#","?"));
            const accessToken = urlParams.get('access_token');
            if(accessToken) {
                setToken(accessToken);
                sessionStorage.setItem("twitch_token", accessToken)
                window.history.replaceState({},document.title, "/");
            }
        }
    },[]);

    useEffect(() => {
        if(token && !userInfo) {
            fetchUserInfo();
        }
    }, [token]);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('https://api.twitch.tv/helix/users', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Client-Id": import.meta.env.VITE_TWITCH_CLIENT_ID
                }
            });
            const data = await response.json();
            if(data.data && data.data.length > 0) {
                const user = data.data[0];
                setUserInfo(user);
                sessionStorage.setItem("twitch_user_info", JSON.stringify(user));
            }

        } catch(e) {
            console.error(e);
        }
    }

    const handleLogout = () => {
        console.log('Logout');
        setToken(null);
        setUserInfo(null);
        sessionStorage.clear();
        window.location.href = '/';
    }

    return (
        <>
            <h1>the13thgeek: Mainframe Hub</h1>
            {!token ? (
                <TwitchLogin />
            ) : userInfo ? (
                <TwitchUserInfo userInfo={userInfo} handleLogout={handleLogout} />
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default App
