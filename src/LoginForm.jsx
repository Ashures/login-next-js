"use client";

import { useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    const skipLogin = () => {
        const cookies = document.cookie;
        const cookieList = cookies.split(";");

        let isLogged;
        cookieList.forEach(cookie => { if (cookie.includes("token=")) isLogged = true});

        if (isLogged) window.location.href = "/home";
    }

    const loginUser = () => {
        document.cookie = `token=${token}`;

        window.location.href = "/home";
    }

    const checkLogin = async () => {
        const error = document.getElementById("login-error");
        const options = {
          "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        };

        const res = await fetch("https://api.spacetraders.io/v2/my/agent", options);

        if (!res.ok) {
            error.style.display = "block";
            error.innerHTML = "User not found!";
            return;
        }

        const data = await res.json();
        error.style.display = "none";
        
        if (data.data.symbol != username.toUpperCase()) {
            error.style.display = "block";
            error.innerHTML = "Invalid username!";
            return;
        }
        
        loginUser();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length === 0 || token.length === 0) return;

        checkLogin();
    };

    skipLogin();

    return (
        <form className="entry-form" id="login-form" onSubmit={handleSubmit} method="POST">
            <div className="login-row" id="login-error">
                <span>
                    User not found!
                </span>
            </div>
            <div className="login-row">
                <input type="text" name="username" id="login-username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="login-row">
                <input type="password" name="token" id="login-token" placeholder="Token" value={token} onChange={e => setToken(e.target.value)} />
            </div>
            <div className="login-row login-btn">
                <button>Log-in</button>
            </div>
        </form>
    );
}