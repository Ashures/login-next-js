"use client";

import { useState } from "react";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    const checkRegister = async () => {
        const error = document.getElementById("register-error");
        const options = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                symbol: username,
                faction: "COSMIC",
            }),
        };
        
        const res = await fetch("https://api.spacetraders.io/v2/register", options);

        if (!res.ok) {
            error.style.display = "block";
            return;
        }
        
        const data = await res.json();
        error.style.display = "none";
        
        setToken(await data.data.token);
        
        const success = document.getElementById("register-success");
        success.style.display = "block";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length === 0) return;

        checkRegister();
    };

    return (
        <form className="entry-form" id="register-form" onSubmit={handleSubmit} method="POST">
            <div className="login-row" id="register-error">
                <span>
                    Username taken!
                </span>
            </div>
            <div className="login-row">
                <input type="text" name="username" id="register-username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="login-row">
                <input type="text" name="token" id="register-token" placeholder="Token" value={token} readOnly />
            </div>
            <div className="login-row login-btn">
                <button>Register</button>
            </div>
            <div className="login-row" id="register-success">
                <span>
                    Success! Save your new token and proceed to log-in.
                </span>
            </div>
        </form>
    );
}