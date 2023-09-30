"use client";

import { useEffect, useState } from "react"

export default function Welcome() {
    const [token, setToken] = useState(() => {
        const cookies = document.cookie;
        const cookieList = cookies.split(";");

        let user;
        cookieList.forEach(cookie => { if (cookie.includes("token=")) user = cookie.slice(cookie.indexOf("=") + 1) });

        return user;
    });
    const [agent, setAgent] = useState("");

    useEffect(() => {
        const options = {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        fetch("https://api.spacetraders.io/v2/my/agent", options)
        .then(res => res.json())
        .then(data => setAgent(data.data.symbol));
    }, [token]);

    return (
        <>
            <h1>Welcome, {agent}</h1>
        </>
    )
};