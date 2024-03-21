import React, { useContext } from 'react'
import { AuthContext } from '../../others/AuthContext'
import { Navigate } from 'react-router-dom'
import './profil.css'

export default function ShowProfil() {
    const { currentUser } = useContext(AuthContext)
    if (!currentUser) {
        return (<><Navigate to="/" /></>)
    }
    return (
        <div className="user-profile">
            <table>
                <tbody>
                    <tr>
                        <td>Nom :</td>
                        <td>{currentUser.nom}</td>
                    </tr>
                    <tr>
                        <td>Prénom :</td>
                        <td>{currentUser.prenom}</td>
                    </tr>
                    <tr>
                        <td>Adresse</td>
                        <td>{currentUser.adresse}</td>
                    </tr>
                    <tr>
                        <td>Complément d'adresse :</td>
                        <td>{currentUser.complement_adresse}</td>
                    </tr>
                    <tr>
                        <td>Code postal :</td>
                        <td>{currentUser.code_postal}</td>
                    </tr>
                    <tr>
                        <td>Ville :</td>
                        <td>{currentUser.ville}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{currentUser.email}</td>
                    </tr>
                    <tr>
                        <td>Telephone</td>
                        <td>{currentUser.telephone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
