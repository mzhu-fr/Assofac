import React, { useContext, useState } from 'react'
import { Login } from '../../component/connexion/login'
import { Register } from '../../component/connexion/register'
import './Connexion.css'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../others/AuthContext'

export const Connexion = () => {
    const { currentUser } = useContext(AuthContext)
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
    if (currentUser) {
        return (<Navigate to="/profil" />)
    }
    else {
        return (
            <div className="connexion">
                <div className="login-register">
                    <div className={"login-register-h2 " + (toLogin ? "active" : "")} onClick={handleLogin}>Se connecter</div>
                    <div className={"login-register-h2 " + (toRegister ? "active" : "")} onClick={handleRegister}>S'enregister</div>
                </div>
                {toLogin ? <Login /> : ""}
                {toRegister ? <Register /> : ""}
            </div>
        )
    }
}
