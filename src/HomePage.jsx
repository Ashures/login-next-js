"use client";

import { useEffect, useState } from "react"
import AgentInfo from "@/AgentInfo";

export default function HomePage() {
    const [token, setToken] = useState(() => {
        const cookies = document.cookie;
        const cookieList = cookies.split(";");

        let user;
        cookieList.forEach(cookie => { if (cookie.includes("token=")) user = cookie.slice(cookie.indexOf("=") + 1) });;

        return user;
    });
    const [agent, setAgent] = useState("");
    const [agentInfo, setAgentInfo] = useState({});

    useEffect(() => {
        if (!token) goToLogin();

        const options = {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        fetch("https://api.spacetraders.io/v2/my/agent", options)
        .then(res => res.json())
        .then(data => {
            setAgent(data.data.symbol);
            setAgentInfo(data.data);
        });
    }, [token]);

    const goToLogin = () => {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

        window.location.href = "/";
    };

    return (
        <div className="home-page">
            {(agent.length !== 0) 
            ? 
                <>
                    <h1>Welcome, {agent}</h1>
                    <AgentInfo info={agentInfo} />
                </>
            :
                <>
                    <h1>Loading...</h1>
                </>
            }
        </div>
    );
};