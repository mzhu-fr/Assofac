import React, { useState } from 'react'
import { Login } from '../../component/connexion/login'
import { Register } from '../../component/connexion/register'
import './Connexion.css'

export const Connexion = () => {
    const [toLogin, setToLogin] = useState(true)
    const [toRegister, setToRegister] = useState(false)

    const handleLogin = () => {
        setToLogin(true)
        setToRegister(false)
    }
    const handleRegister = () => {
        setToLogin(false)
        setToRegister(true)
    }
    return (
        <div className="connexion">
            <div className="login-register">
                <div className={"login-register-h2 " + (toLogin ? "active" : "")} onClick={handleLogin}>Login</div>
                <div className={"login-register-h2 " + (toRegister ? "active" : "")} onClick={handleRegister}>Register</div>
            </div>
            {toLogin ? <Login /> : ""}
            {toRegister ? <Register /> : ""}
        </div>
    )
}
