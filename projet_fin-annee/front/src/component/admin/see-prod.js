import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai';
import axios from 'axios'
import './produits.css'

export const SeeProd = () => {
    const [data, setData] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [updateCable, setUpdateCable] = useState({})
    const [updateInput, setUpdateInput] = useState({
        image: "",
        prix: "",
        quantite: "",
        reference: ""
    })
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/product-cable/cable")
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8800/product-cable/cable/' + id)
            alert("Produit supprimé")
            window.location.reload()
        } catch (err) {
            alert("Erreur dans la suppression du produit.")
        }
    }

    const handleChange = (e) => {
        setUpdateInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/product-cable/cable/" + updateCable.idcable, updateInput)
            handleCloseModal()
            alert('Produit mis à jour')
            window.location.reload()
        } catch (err) {
            alert(err)
        }
    }
    const handleOpenModal = (cable) => {
        setUpdateCable(cable)
        setUpdateInput({
            image: cable.image,
            prix: cable.prix,
            quantite: cable.quantite,
            reference: cable.reference
        })
        // console.log(updateInput)
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
        setUpdateInput({
            image: "",
            prix: "",
            quantite: "",
            reference: ""
        })
        setUpdateCable({})
    }
    console.log(updateInput)
    return (
        <>
            {openModal ? <div className='update-product-modal'>
                <div className="update-product-modal-overlay"></div>
                <div className="update-product-modal-window">
                    <span onClick={handleCloseModal}><AiFillCloseSquare /></span>
                    <table className="update-product-responsive">
                        <tbody>

                            <tr>
                                <td>Reference : {updateCable.reference}</td>
                                <td><input placeholder="Reference" name="reference" type="text" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Quantite :  {updateCable.quantite}</td>
                                <td><input placeholder="Quantite" name="quantite" type="text" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Prix :  {updateCable.prix}</td>
                                <td><input placeholder="Prix" name="prix" type="text" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Image : </td>
                                <td><input placeholder="Image produit" name="image" type="text" onChange={handleChange} /></td>
                            </tr>

                        </tbody>
                        <button onClick={handleUpdateProduct}>Mettre à jour</button>
                    </table>
                </div>
            </div> : ""}
            {data[0] ?
                <div className="product-cable-display-admin"> {data.map(cable => (
                    <div className="product-cable-unique-admin" key={cable.idcable}>
                        <img src={cable.image} alt={cable.SKU} />
                        <span className="product-name">Référence : {cable.reference}</span>
                        <span>Quantité : {cable.quantite}</span>
                        <span>Prix : {cable.prix}</span>
                        <span>Couleur : {cable.couleur}</span>
                        <div className="update-delete-button">
                            <button className="update-button" onClick={() => handleOpenModal(cable)}>Update</button>
                            <button className="delete-button" onClick={() => handleDelete(cable.idcable)}>Delete</button>
                        </div>
                    </div>
                ))}</div> :
                <div>Product Not Found</div>}
        </>
    )
}
