import React, { useContext, useState } from 'react'
import { AuthContext } from '../../others/AuthContext';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/i;
const phoneRegex = /^0[67][0-9]{8}$/
const codePostRegex = /^[0-9]{5}$/

export default function UpdateProfil() {
    const { currentUser } = useContext(AuthContext)
    const [message, setMessage] = useState()
    const [newUser, setNewUser] = useState({
        nom: currentUser.nom,
        prenom: currentUser.prenom,
        adresse: currentUser.adresse,
        complement_adresse: currentUser.complement_adresse,
        code_postal: currentUser.code_postal,
        ville: currentUser.ville,
        email: currentUser.email,
        telephone: currentUser.telephone
    })

    const handleChange = (e) => {
        setMessage()
        setNewUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!newUser.adresse || !newUser.nom || !newUser.email || !newUser.prenom || !newUser.code_postal || !newUser.telephone || !newUser.ville) {
            setMessage("Fields cannot be blank.");
            return;
        }
        if (newUser.adress < 1) {
            setMessage("Fields cannot be blank.");
            return;
        }
        if (!codePostRegex.test(newUser.code_postal)) {
            setMessage("Please use a valid post code format.");
            return;
        }
        if (!phoneRegex.test(newUser.telephone)) {
            setMessage("Please use a valid phone format.");
            return;
        }
        if (!emailRegex.test(newUser.email)) {
            setMessage("Please use a valid email adress format.");
            return;
        }

        else {
            const res = await fetch("http://localhost:8800/user-data/users/" + currentUser.iduser, {
                method: 'PUT',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                const status = await res.json()
                console.log(status)
            }
            else {
                setMessage("Profil mis à jour.")
                const status = await res.json()
                console.log(status)
            }
        }
    }
    return (
        <div className="modify-profil-form">
            <p>{message ? <>{message}</> : ""}</p>
            <form className="profil-form">
                <label>Nom :</label>
                <input placeholder="Nom" value={newUser.nom} name="nom" type="text" onChange={handleChange} />

                <label>Prénom :</label>
                <input placeholder="Prénom" value={newUser.prenom} name="prenom" type="text" onChange={handleChange} />

                <label>Adresse :</label>
                <input placeholder="Adresse" value={newUser.adresse} name="adresse" type="text" onChange={handleChange} />

                <label>Complément d'adresse :</label>
                <input placeholder="Complément d'adresse" value={newUser.complement_adresse} name="complement_adresse" type="text" onChange={handleChange} />

                <label>Code postal :</label>
                <input placeholder="Code postal" value={newUser.code_postal} name="code_postal" type="text" onChange={handleChange} />

                <label>Ville :</label>
                <input placeholder="Ville" value={newUser.ville} name="ville" type="text" onChange={handleChange} />

                <label>Email :</label>
                <input placeholder="Email" value={newUser.email} name="email" type="email" onChange={handleChange} />

                <label>Téléphone :</label>
                <input placeholder="Téléphone" value={newUser.telephone} name="telephone" type="text" onChange={handleChange} />

                <button onClick={handleSubmit}>Modifier</button>
            </form>

        </div >
    )
}
