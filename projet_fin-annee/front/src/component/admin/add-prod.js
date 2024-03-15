import axios from 'axios'
import React, { useState } from 'react'
import './produits.css'

export const AddProd = () => {
    const [message, setMessage] = useState()
    const [inputs, setInputs] = useState({
        SKU: "",
        reference: "",
        quantite: "",
        longueur: "",
        poids: "",
        couleur: "",
        type: "",
        entree_type: "",
        prix: "",
        vitesse: "",
        image: ""
    })

    const handleChange = (e) => {
        setMessage("")
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((inputs.SKU || inputs.reference || inputs.quantite || inputs.longueur || inputs.poids || inputs.couleur || inputs.tpe || inputs.entree_type || inputs.prix || inputs.vitesse || inputs.image) > 1) {
            setMessage("Remplir tous les champs.")
            return
        }
        else {
            try {
                // console.log("Add prod log")
                const res = await axios.post("http://localhost:8800/product-cable/cable", inputs)
                setMessage("Produit ajouté.")
                // console.log(res)
            }
            catch (err) {
                setMessage(err.response.data)
                // console.log(err)
            }
        }

    }
    return (
        <div className='addProd'>
            {message ? <p>{message}</p> : ""}
            <table>
                <tbody>
                    <tr>
                        <td>SKU :</td>
                        <td><input placeholder="SKU" name="SKU" type="text" onChange={handleChange} required /></td>
                    </tr>
                    <tr>
                        <td>Reference:</td>
                        <td><input placeholder="Reference" name="reference" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Quantite :</td>
                        <td><input placeholder="Quantite" name="quantite" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Longueur :</td>
                        <td><input placeholder="Longueur" name="longueur" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Poids :</td>
                        <td><input placeholder="Poids" name="poids" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Couleur :</td>
                        <td><input placeholder="Couleur" name="couleur" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Type :</td>
                        <td><input placeholder="Type" name="type" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Type d'entrée (USB ou C) :</td>
                        <td><input placeholder="USB ou C" name="entree_type" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Prix :</td>
                        <td><input placeholder="Prix" name="prix" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Vitesse :</td>
                        <td><input placeholder="Vitesse" name="vitesse" type="text" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Image :</td>
                        <td><input placeholder="Image produit" name="image" type="text" onChange={handleChange} /></td>
                    </tr>

                </tbody>

            </table>
            <button onClick={handleSubmit}>Ajouter nouveau câble</button>
        </div>
    )
}
