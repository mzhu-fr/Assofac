import React, { useContext, useState } from 'react'
import UpdateProfil from '../../component/profil/update-profil'
import ShowProfil from '../../component/profil/show-profil'
import './profil.css'
import { AuthContext } from '../../others/AuthContext'
import { Navigate } from 'react-router-dom'

export const Profil = () => {
    const [toSee, setToSee] = useState(true)
    const [toUpdate, setToUpdate] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleSee = () => {
        setToSee(true)
        setToUpdate(false)
    }
    const handleUpdate = () => {
        setToSee(false)
        setToUpdate(true)
    }
    if (currentUser) {
        return (
            <div className="profil">
                <div className="see-update">
                    <div className={"see-update-h2 " + (toSee ? "active" : "")} onClick={handleSee}>Voir le profil</div>
                    <div className={"see-update-h2 " + (toUpdate ? "active" : "")} onClick={handleUpdate}>Modifier le profil</div>
                </div>
                {toSee ? <ShowProfil /> : ""}
                {toUpdate ? <UpdateProfil /> : ""}

            </div>
        )
    }
    else {
        return (<Navigate to="/" />)
    }
}