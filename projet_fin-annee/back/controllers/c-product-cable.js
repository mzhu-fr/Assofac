import { db } from "../setup.js"

// CREATE A PRODUCT IF SKU IS NOT EXISTING
export const createProductCable = (req, res) => {
    const q = "SELECT * FROM `e-rigation`.`product-cable` WHERE SKU=? OR reference =?"
    db.query(q, [req.body.SKU, req.body.reference], (err, data) => {
        if (err) return (res.status(400).json(err))
        if (data.length) return (res.status(400).json("SKU/Reference déjà utilisé."))
        const product = [
            req.body.SKU,
            req.body.reference,
            req.body.quantite,
            req.body.longueur,
            req.body.poids,
            req.body.couleur,
            req.body.type,
            req.body.entree_type,
            req.body.prix,
            req.body.vitesse,
            req.body.image
        ]
        const q = 'INSERT INTO `e-rigation`.`product-cable` (`SKU`, `reference`, `quantite`, `longueur`, `poids`, `couleur`, `type`, `entree_type`, `prix`, `vitesse`, `image`) VALUES (?)'
        db.query(q, [product], (err, data) => {
            if (err) return (res.status(400).json(err))
            return (res.status(200).json("Product created."))
        })
    })

}

export const getAvailableProductCable = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`product-cable` WHERE quantite > 0'
    db.query(q, (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}

export const getIphoneCable = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`product-cable` WHERE type=? AND quantite > 0'
    db.query(q, "lightning", (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}

export const getCCable = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`product-cable` WHERE type=? AND quantite > 0'
    db.query(q, "C", (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}

export const getMicroCable = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`product-cable` WHERE type=? AND quantite > 0'
    db.query(q, "micro", (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}

export const updateProductCableInfo = (req, res) => {
    const product = [
        req.body.quantite,
        req.body.prix,
        req.body.image,
        req.body.reference,
        req.params.id
    ]
    const q = 'UPDATE `e-rigation`.`product-cable` SET quantite=?, prix=?, image=?, reference=? WHERE idcable=?'
    db.query(q, [...product], (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("Product cable updated."))
    })
}

export const updateStockage = (req, res) => {
    const product = [
        req.body.quanite,
        req.params.idprod
    ]
    const q = 'UPDATE `e-rigation`.`product-cable` SET quantite=? WHERE idcable=?'
    db.query(q, [...product], (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("Stock updated."))
    })
}

export const deleteProductCable = (req, res) => {
    const q = 'DELETE FROM `e-rigation`.`product-cable` WHERE idcable = ?'
    db.query(q, req.params.id, (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("Product cable deleted."))
    })
}