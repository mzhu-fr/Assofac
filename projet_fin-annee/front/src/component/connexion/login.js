import React, { useContext, useState } from 'react'
import { AuthContext } from '../../others/AuthContext'
import { useNavigate } from 'react-router-dom';
import './connexion.css'

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)
    const [message, setMessage] = useState()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const handleChange = e => {
        setMessage();
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(inputs)
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/profil')
        }
        catch (err) {
            console.log(err.response.data);
            setMessage(err.response.data)
        }
    }
    return (
        <div className="login-form">
            <p>{message ? <>{message}</> : ""}</p>
            <form className="login-form">
                <div className="part">
                    <label>Email :</label>
                    <input placeholder="Email" name="email" type="email" onChange={handleChange} />

                </div>
                <div className="part">
                    <label>Mot de passe :</label>
                    <input placeholder="Mot de passe" name="password" type="password" onChange={handleChange} />
                </div>
                <button onClick={handleSubmit}>Se connecter</button>
            </form>
        </div>
    )
}
