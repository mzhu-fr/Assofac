import React, { useContext, useState } from 'react'
import { AuthContext } from '../../others/AuthContext'
import axios from 'axios'

const passwordRegex = /^[a-zA-Z0-9]{6,12}$/;

export const UpdatePassword = () => {
    const { currentUser } = useContext(AuthContext)
    let idUser = "";
    const [message, setMessage] = useState()
    const [password, setPassword] = useState({
        password: "",
        comparePassword: ""
    })
    if (currentUser) {
        idUser = currentUser.iduser
    }

    const handleChange = (e) => {
        setMessage("")
        setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changePassword = async (e) => {
        e.preventDefault()
        if ((!password.password || !password.comparePassword)) {
            setMessage("Veuillez remplir tous les champs.")
        }
        else if (password.password !== password.comparePassword) {
            setMessage("Veuillez saisir le même mot de passe.")
        }
        else if (!passwordRegex.test(password.password)) {
            setMessage("Le mot de passe doit être compris entre 6 et 12 charactères.")
        }
        else if (idUser) {
            try {
                await axios.put("http://localhost:8800/user-data/users-psswd/" + idUser, password)
                alert("Utilisez le nouveau mot de passe à votre prochaine connexion.")
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div>
            <h1>Changer le mot de passe</h1>
            <span>{message ? <p>{message}</p> : ""}</span>
            <table>
                <tbody>
                    <tr>
                        <td><label>Nouveau mot de passe :</label></td>
                        <td><input placeholder='Nouveau mot de passe' type="password" name="password" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td><label>Confirmez votre mot de passe :</label></td>
                        <td><input placeholder='Confirmez votre mot de passe' name="comparePassword" type="password" onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={changePassword}>Confirmer</button>
        </div>
    )
}
