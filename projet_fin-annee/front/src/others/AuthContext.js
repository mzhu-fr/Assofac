import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const userLogin = async (inputs) => {
        const res = await fetch("http://localhost:8800/auth/login", {
            method : "POST",
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setCurrentUser(res.data)
    }

    const logout = async () => {
        const res = await axios.post("http://localhost:8800/auth/logout");
        setCurrentUser(null);
        console.log(res);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])
    return (
        <AuthContext.Provider value={{ userLogin, logout, currentUser }}> {children} </AuthContext.Provider>
    )
}