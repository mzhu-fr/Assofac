import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../others/AuthContext'
import { useDispatch } from 'react-redux'
import { hideSidebar } from '../../redux-store/actions/sidebar-action.js'

export const NavbarContent = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const dispatch = useDispatch()

  const handleCloseSidebar = () => {
    dispatch(hideSidebar())
  }

  const handleLogout = async () => {
    try {
      await logout()
      handleCloseSidebar()
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="navbar-content-links">
      <Link to="/" onClick={handleCloseSidebar}>Accueil</Link>
      <Link to="/produits" onClick={handleCloseSidebar}>Produits</Link>
      <Link to="/a-propos" onClick={handleCloseSidebar}>A propos</Link>
      <Link to="/panier" onClick={handleCloseSidebar}>Panier</Link>
      {currentUser ? "" : <Link to="/connexion" onClick={handleCloseSidebar}>Se connecter</Link>}

      {currentUser ? <Link to="/profil" onClick={handleCloseSidebar}>Profil</Link> : ""}
      {currentUser && (currentUser.role === "admin" || currentUser.role === "SAdmin") ? <Link to="/admin" onClick={handleCloseSidebar}>Admin</Link> : ""}


      {currentUser ? <Link to="/" onClick={handleLogout}>Déconnexion</Link> : ""}
    </div>
  )
}
