import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../others/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './produits.css'

export const UpdateRole = () => {
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState()
    const [message, setMessage] = useState()
    const password = { password: "123456" }
    try {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/user-data/all-users/" + currentUser.iduser)
                setUsers(res.data)
            } catch (err) {
                setMessage(err)
            }
        }
        getData()
    } catch (err) {
        console.error("Erreur lors de la récupération de données.")
    }

    if (currentUser && currentUser.role === "SAdmin") {
        const handleRefresh = () => {
            window.location.reload()
        }
        const handleToUser = async (id) => {
            try {
                await axios.put("http://localhost:8800/user-data/all-users/" + id + "/user")
                handleRefresh()
            } catch (err) {
                setMessage(err)
            }
        }
        const handleToAdmin = async (id) => {
            try {
                await axios.put("http://localhost:8800/user-data/all-users/" + id + "/admin")
                handleRefresh()
            } catch (err) {
                setMessage(err)
            }
        }
        const handleToSAdmin = async (id) => {
            try {
                await axios.put("http://localhost:8800/user-data/all-users/" + id + "/SAdmin")
                handleRefresh()
            } catch (err) {
                setMessage(err)
            }
        }
        const handleNewPassword = async (id) => {
            try {
                await axios.put("http://localhost:8800/user-data/users-psswd/" + id, password)
                alert("Mot de passe modifié pour l'utilisateur.")
                window.location.reload()
            } catch (err) {
                alert("Erreur lors du changement du mot de passe.")
            }
        }
        return (
            <div className='user-display'>
                {message ? <p>{message}</p> : ""}
                {users && users[0] ? users.map(user => (
                    <div className="user-card" key={user.iduser}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{user.nom.toUpperCase()}</td>
                                    <td>{user.prenom.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td>{user.email}</td>
                                    <td>{user.telephone}</td>
                                </tr>
                            </tbody>
                        </table>
                        <span className="update-role-bold">role : {user.role}</span>
                        <div className="role-update-button">
                            <button className="toUser" onClick={() => handleToUser(user.iduser)}>User</button>
                            <button className="toAdmin" onClick={() => handleToAdmin(user.iduser)}>Admin</button>
                            <button className="toSuperAdmin" onClick={() => handleToSAdmin(user.iduser)}>S-Admin</button>
                            <button className="forgot-password" onClick={() => handleNewPassword(user.iduser)}>Modifier MdP</button>
                        </div>
                    </div>
                )) : ""}
            </div>
        )
    }
    else {
        return (
            <div>
                <p>Pas d'autorité pour accéder à cette option.</p>
            </div>
        )
    }
}