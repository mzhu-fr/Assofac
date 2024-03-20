import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './display-produits.css'
import { AddProductToCart } from '../panier/panier'

export const FiltreApple = () => {
    const [apple, setApple] = useState()
    useEffect(() => {

        const getApple = async () => {
            try {
                const res = await axios.get("http://localhost:8800/product-cable/cablelightning")
                setApple(res.data)
            } catch (err) {
                console.log(err)
            }

        }

        getApple()
    }, [])
    return (
        <div className="display-product-cable">
            {apple && apple[0] ? apple.map(one => (
                <div className="display-one-product-card" key={one.idproduct}>
                    <img className="display-one-product-image" src={one.image} alt={one.SKU} />
                    <div className="display-one-product-info">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Reference :</td>
                                    <td>{one.reference}</td>
                                </tr>
                                <tr>
                                    <td>Quantité :</td>
                                    <td>{one.quantite}</td>
                                </tr>
                                <tr>
                                    <td>Longueur (en m) :</td>
                                    <td>{one.longueur}</td>
                                </tr>
                                <tr>
                                    <td>Poids (au g) :</td>
                                    <td>{one.poids}</td>
                                </tr>
                                <tr>
                                    <td>Couleur :</td>
                                    <td>{one.couleur}</td>
                                </tr>
                                <tr>
                                    <td>Type :</td>
                                    <td>{one.type}</td>
                                </tr>
                                <tr>
                                    <td>Embout (C ou USB):</td>
                                    <td>{one.entree_type}</td>
                                </tr>
                                <tr>
                                    <td>Prix :</td>
                                    <td>{one.prix}</td>
                                </tr>
                                <tr>
                                    <td>Vitesse :</td>
                                    <td>{one.vitesse}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={() => AddProductToCart(one.idcable)}>Ajouter produit</button>
                    </div>
                </div>
            )) : ""}
        </div>
    )
}
