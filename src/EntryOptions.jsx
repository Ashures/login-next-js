"use client";

import LoginForm from "@/LoginForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

export default function EntryOptions() {
    const [currentTab, setCurrentTab] = useState(0);
    
    return (
        <div className="entry-table">
          <div className="entry-tabs">
            <ul>
                <button className="tab-button" onClick={() => setCurrentTab(0)}><li>Log-in</li></button>
                <button className="tab-button" onClick={() => setCurrentTab(1)}><li>Register</li></button>
            </ul>
          </div>
          {(currentTab === 0) 
          ?
            <LoginForm />
          :
            <RegisterForm />
          }
        </div>
      );
}