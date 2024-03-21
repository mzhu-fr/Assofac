import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddProductToCart, RemoveCart, RemoveProductToCart, ValiderPanier } from '../../component/panier/panier';
import { AuthContext } from '../../others/AuthContext.js'
import './panier.css'

export const Panier = () => {
    const { currentUser } = useContext(AuthContext)
    const [allData, setAllData] = useState()
    var getTotal = 0;
    const navigate = useNavigate("")
    useEffect(() => {
        const getData = async () => {
            if (!localStorage.getItem("panier")) {
                console.error("Erreur lors du chargement de données.")
            } else {
                const getDataFromParsing = localStorage.getItem('panier')
                setAllData(JSON.parse(getDataFromParsing))
            }
        }
        getData()
    }, [])
    if (allData && allData[0]) {
        for (let i = 0; allData[i]; i++) {
            getTotal += (allData[i].prix * allData[i].quantite)
        }
    }
    const handleAdd = (id) => {
        AddProductToCart(id)
        alert("Produit ajouté au panier")
        window.location.reload()
    }
    const handleRemove = (id) => {
        RemoveProductToCart(id)
        alert("Produit retiré du panier")
        window.location.reload()
    }
    const handlePay = async (id) => {
        await ValiderPanier(id, allData)
        alert("Votre panier a été validé, vous allez recevoir vos articles sous peu.")
        navigate("/")
    }
    const handleCancelCart = () => {
        RemoveCart()
        alert("Panier annulé")
        navigate("/")
    }
    return (
        <div className="panier">
            <div>{allData && allData[0] ? allData.map(product => (
                <div key={product.idcable} className='produit-panier'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nom</th>
                                <th>Quantité</th>
                                <th>Prix total</th>
                            </tr>
                            <tr>
                                <td>{product.reference} {product.couleur}</td>
                                <td>{product.quantite}</td>
                                <td>{(product.prix * product.quantite).toFixed(2)}€</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="ajouter-panier" onClick={() => handleAdd(product.idcable)}>Ajouter +</button>
                    <button className="retirer-panier" onClick={() => handleRemove(product.idcable)}>Retirer -</button>
                </div>
            )) : <span className="panier-vide">PANIER VIDE</ span>}
                <div className="display-prix-panier">
                    {allData && allData[0] ?
                        <div>
                            <table>
                                <tbody>

                                    <tr>
                                        <td className="titre-display-prix-panier">TOTAL HT</td>
                                        <td>{(getTotal * (80 / 100)).toFixed(2)} €</td>
                                    </tr>
                                    <tr>
                                        <td className="titre-display-prix-panier">TVA</td>
                                        <td>{(getTotal * (20 / 100)).toFixed(2)} €</td>
                                    </tr>
                                    <tr>
                                        <td className="titre-display-prix-panier">Total TTC</td>
                                        <td>{getTotal.toFixed(2)} €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        : ""}
                </div>
                <div className="display-annuler-payer">
                    {allData && allData[0] && currentUser ?
                        <><button className="annuler-panier" onClick={handleCancelCart} >Annuler</button>
                            <button className="payer-panier" onClick={() => handlePay(currentUser.iduser)}>Payer</button>
                        </>
                        : <>{currentUser ? "" : <button>< Link to="/connexion">Se connecter</Link></button>}</>}
                </div>
            </div >
        </div >
    )
}
