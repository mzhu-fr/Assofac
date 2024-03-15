import React, { useContext, useState } from 'react'
import { AddProd } from '../../component/admin/add-prod'
import { UpdateRole } from '../../component/admin/update-role'
import './Admin.css'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../others/AuthContext'

export const Admin = () => {
    const [toAddProd, setToAddProd] = useState(false)
    const [toUpdateRole, setToUpdateRole] = useState(true)
    const { currentUser } = useContext(AuthContext)

    const handleAddProd = () => {
        setToAddProd(true)
        setToUpdateRole(false)
    }
    const handleChangeUserRole = () => {
        setToAddProd(false)
        setToUpdateRole(true)
    }
    if (!currentUser || (currentUser && currentUser.role === "user")) {
        return (<Navigate to="/" />)
    }
    else {
        return (
            <div className="admin-panel">
                <div className="add-update-ect">
                    <div className={"add-update " + (toAddProd ? "active" : "")} onClick={handleAddProd}>Ajouter produit</div>
                    <div className={"add-update " + (toUpdateRole ? "active" : "")} onClick={handleChangeUserRole}>Changer un role</div>

                </div>
                {toAddProd ? <AddProd /> : ""}
                {toUpdateRole ? <UpdateRole /> : ""}
            </div>
        )
    }
}
