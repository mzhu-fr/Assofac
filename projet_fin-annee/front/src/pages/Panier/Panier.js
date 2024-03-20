import React, { useEffect, useState } from 'react'

export const Panier = () => {
    const [allData, setAllData] = useState()
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
    return (
        <div className="panier">
            {allData && allData[0] ? allData.map(product => (
                <div key={product.idcable} className='produit-panier'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nom</th>
                                <th>Quantité</th>
                                <th>Prix total</th>
                            </tr>
                            <tr>
                                <td>{product.reference}</td>
                                <td>{product.quantite}</td>
                                <td>{product.prix * product.quantite}€</td>
                            </tr>
                        </tbody>
                    </table>
                    <button>Ajouter +</button>
                    <button>Retirer -</button>
                </div>
            )) : "Panier vide"}
        </div >
    )
}
