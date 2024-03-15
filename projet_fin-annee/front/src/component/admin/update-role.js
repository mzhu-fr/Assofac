import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../others/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './produits.css'

export const UpdateRole = () => {
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState()
    const [message, setMessage] = useState()
    var a = 0
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/user-data/all-users/" + currentUser.iduser)
                setUsers(res.data)
            } catch (err) {
                setMessage(err)
            }
        }
        getData()
    }, [a])

    if (currentUser && currentUser.role === "SAdmin") {
        a += 1
        // console.log(a)
        // console.log(users)
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