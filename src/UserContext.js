import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const API_URL = 'http://localhost:3000/api/master/getusermaster';
  async function loginUser(event, username, password) {
    event.preventDefault();
    console.log(event)

    try {
      const response = await fetch(`${API_URL}?username=${username}&password=${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });

      console.log(response)

      const data = await response.json();

      if (response.ok && data.length > 0) {
        const user = data.find(user => user.UserID === username && user.Password === password);
        if (user) {
          setUser(user);
          const branch = user.Branch[0];
          router.push("/production-home");
        } else {
          alert("User not found");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      alert("An error occurred while logging in: " + error.message);
    }
  }
  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };
  // useEffect (() => {
  //   loginUser()
  // }, []) 

  return (
    <UserContext.Provider value={{ user, loginUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
