import React from 'react'
import './home.css'
import { Commentaire } from '../../component/home/commentaire'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="Home">

      <div className="voir-produits">
        <Link className="button" to="/produits">Voir produits</Link>
      </div>
      <div className="apprendre-plus">
        <Link className="button" to="/a-propos">Apprendre plus</Link>
      </div>
      <div className="box-commentaires">
        <h3>Nos meilleurs commentaires : </h3>
        <Commentaire />
      </div>

    </div>
  )
}

export default Home