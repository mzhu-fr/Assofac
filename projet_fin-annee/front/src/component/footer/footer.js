import React from 'react'
import './footer.css'
import { FaInstagram } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import { FaGripLinesVertical } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export const Footer = () => {
  return (
    <div class="footer">
      <div class="copyrights">
        <h7>Copyrights by Mélanie ZHU | Projet fin d'année | Assofac</h7>
      </div >
      <div class="reseaux-sociaux">
        <p><FaInstagram /> <FaGripLinesVertical /> <FaFacebook /> <FaGripLinesVertical /> <FaXTwitter /></p>
      </div>
    </div >
  )
}
