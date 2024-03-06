import { db } from "../setup.js"

export const createComment = (req, res) => {
    const comment = [
        req.params.iduser,
        req.params.idprod,
        req.body.message,
        req.body.note
    ]
    const q = 'INSERT INTO `e-rigation`.`comments` (`iduser`, `idproduct`, `message`, `note`) VALUES (?)'
    db.query(q, [comment], (err, data) =>{
        if(err) return(res.status(400).json(err))
        return(res.status(200).json("Comment created."))
    })
}

export const showUserComment = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`comments` WHERE iduser =?'
    db.query(q, req.params.iduser, (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json(data))
    })
}

export const showBestComment = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`comments` WHERE note > 8 LIMIT 5'
    db.query(q, req.params.iduser, (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json(data))
    })
}

export const showProductComment = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`comments` WHERE idproduct =? '
    db.query(q, req.params.idprod, (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json(data))
    })

}

export const updateComment = (req, res) => {
    const comment = [
        req.body.message,
        req.body.note,
        req.params.idcom
    ]
    const q = 'UPDATE `e-rigation`.`comments` SET message=?, note = ? WHERE idcomments=?'
    db.query(q, [...comment], (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json("Comment updated."))
    })
}

export const deleteComment = (req, res) => {
    const q = 'DELETE FROM `e-rigation`.`comments` WHERE idcomments=?'
    db.query(q, req.params.idcom, (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json("Comment deleted."))
    })
}