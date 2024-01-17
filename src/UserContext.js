// UserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export const UserContext = createContext();
const initializeUser = () => {
  if (typeof window !== 'undefined') {
    // Check if localStorage is available on the client side
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initializeUser());
  const router = useRouter();
  const API_URL = '';
  const logUserLoginToNewRelic = (username) => {
    const currentTimestamp = new Date().toISOString();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_NEWRELIC_API_KEY);

  var logPayload = {
    timestamp: currentTimestamp,
      message: `User '${username}' logged in`,
      logtype: "accesslogs",
      service: "login-service",
      hostname: "login.example.com"
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(logPayload),
      redirect: 'follow'
    };

    fetch(process.env.NEXT_PUBLIC_NEWRELIC_LOG_ENDPOINT, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error('Error logging to New Relic:', error));
  };

  const loginUser = async (event, username, password) => {
    event.preventDefault();
    logUserLoginToNewRelic(username);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_ENDPOINT}?UserID=${username}&Password=${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
  
      console.log(response.status); // Log the response status code
  
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const user = data.find((user) => user.UserID === username && user.Password === password);
          if (user) {
            setUser(user);
            const branch = user.Branch[0];
            router.push("/production-home");
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            alert("User not found");
          }
        } else {
          alert("Login failed");
        }
      } else {
        // Log the response text in case of an error
        console.error(`An error occurred while logging in: ${await response.text()}`);
        alert("An error occurred while logging in.");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      alert("An error occurred while logging in: " + error.message);
    }
  }
  
  useEffect(() => {
    // Retrieve user from local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (!user && !initializeUser()) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (!user && !initializeUser()) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };
  

  return (
    <UserContext.Provider value={{ user, loginUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
