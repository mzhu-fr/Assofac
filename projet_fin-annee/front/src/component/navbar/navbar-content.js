import React from 'react'
import { Link } from 'react-router-dom'

export const NavbarContent = () => {
  return (
    <div class="navbar-content-links">
        <Link to="/">Accueil</Link>
        <Link to="/">Produits</Link>
        <Link to="/">A prpopos</Link>
        <Link to="/">Se connecter</Link>
    </div>
  )
}
