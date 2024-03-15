import React, { useState } from 'react'
import './connexion.css'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/i;
const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
const phoneRegex = /^0[67][0-9]{8}$/
const codePostRegex = /^[0-9]{5}$/

export const Register = () => {
    const [comparePassword, setComparePassword] = useState()
    const [message, setMessage] = useState([])
    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        adresse: "",
        complement_adresse: "",
        code_postal: "",
        ville: "",
        telephone: "",
        email: "",
        password: "",
        comparePassword: ""
    })
    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleComparePassword = (e) => {
        setComparePassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((user.password || user.nom || user.email || user.prenom) < 1) {
            setMessage("Fields cannot be blank.");
            return;
        }
        if (user.password !== comparePassword) {
            setMessage("Password is not matching")
            return;
        }
        if (!codePostRegex.test(user.code_postal)) {
            setMessage("Please use a valid post code format.");
            return;
        }
        if (!phoneRegex.test(user.telephone)) {
            setMessage("Please use a valid phone format.");
            return;
        }
        if (!emailRegex.test(user.email)) {
            setMessage("Please use a valid email adress format.");
            return;
        }
        if (!passwordRegex.test(user.password)) {
            setMessage("Password is minimum 6 characters.");
            return;
        }
        else {
            try {
                const res = await fetch("http://localhost:8800/auth/register", {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!res.ok) {
                    const errorData = await res.json();
                    setMessage(errorData);
                } else {
                    setMessage("Successfully registered !")
                    setUser({
                        nom: "",
                        prenom: "",
                        adresse: "",
                        complement_adresse: "",
                        code_postal: "",
                        ville: "",
                        telephone: "",
                        email: "",
                        password: "",
                        comparePassword: ""
                    })
                }
            }
            catch (err) {
                setMessage("An error occurred while registering, please try another time.")
            }
        }
    }
    console.log(user)
    return (
        <div className="register-form">
            <p>{message ? <>{message}</> : ""}</p>
            <form className="register-form">
                <div className="section-form">
                    <div className="part">
                        <label>Nom :</label>
                        <input placeholder="Nom" name="nom" value={user.nom} type="text" onChange={handleChange} required />
                    </div>
                    <div className="part">
                        <label>Prénom :</label>
                        <input placeholder="Prénom" name="prenom" value={user.prenom} type="text" onChange={handleChange} required />
                    </div>
                </div>
                <div className="section-form">
                    <div className="part">
                        <label>Adresse :</label>
                        <input placeholder="Adresse" name="adresse" value={user.adresse} type="text" onChange={handleChange} required />
                    </div>
                    <div className="part">
                        <label>Complément d'adresse :</label>
                        <input placeholder="Complément d'adresse" name="complement_adresse" value={user.complement_adresse} type="text" onChange={handleChange} required />
                    </div>
                </div>
                <div className="section-form">
                    <div className="part">
                        <label>Code postal :</label>
                        <input placeholder="Code postal" name="code_postal" value={user.code_postal} type="text" onChange={handleChange} required />
                    </div>
                    <div className="part">
                        <label>Ville :</label>
                        <input placeholder="Ville" name="ville" value={user.ville} type="text" onChange={handleChange} required />
                    </div>
                </div>
                <div className="section-form">
                    <div className="part">
                        <label>Email :</label>
                        <input placeholder="Email" name="email" value={user.email} type="email" onChange={handleChange} required />
                    </div>
                    <div className="part">
                        <label>Numéro de téléphone :</label>
                        <input placeholder="N° de téléphone" name="telephone" value={user.telephone} type="text" onChange={handleChange} required />
                    </div>
                </div>
                <div className="section-form">
                    <div className="part">
                        <label>Mot de passe :</label>
                        <input placeholder="Mot de passe" name="comparePassword" defaultValue={user.comparePassword} type="password" onChange={handleComparePassword} />
                    </div>

                    <div className="part">
                        <label>Confirmez le mot de passe :</label>
                        <input placeholder="Reconfirmez le mot de passe" name="password" value={user.password} type="password" onChange={handleChange} required />
                    </div>
                </div>
                <button onClick={handleSubmit}>Valider</button>
            </form>

        </div>
    )
}
