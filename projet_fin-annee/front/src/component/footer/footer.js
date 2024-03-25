import React from 'react'
import './footer.css'
import { FaInstagram } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import { FaGripLinesVertical } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className="footer">
      <div className="copyrights">
        <h6>Copyrights by Mélanie ZHU | <Link to="/cgv">CGV</Link> | <Link to="/cgu">CGU</Link> | <Link to="/termes">Termes d'utilisation</Link></h6>
      </div >
      <div className="reseaux-sociaux">
        <p><FaInstagram /> <FaGripLinesVertical /> <FaFacebook /> <FaGripLinesVertical /> <FaXTwitter /></p>
      </div>
    </div >
  )
}
