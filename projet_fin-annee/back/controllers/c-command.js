import { db } from "../setup.js"

export const createCommand = (req, res) => {
    const q = 'INSERT INTO `e-rigation`.`historic_command` (`iduser`) VALUES (?)'
    db.query(q, req.params.iduser, (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json(data.insertId))
    })
}

export const addProductSold = (req, res) => {
    const sell = [
        req.body.idproduct,
        req.body.quantity,
        req.params.idcommand
    ]
    const q = 'INSERT `e-rigation`.`historic_sold` (`idproduct`, `quantity`, `idcmd`) VALUES(?)'
    db.query(q, [sell], (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json("Product sold."))
    })
}

export const updateCommand = (req, res) => {
    const q = 'UPDATE `e-rigation`.`historic_command` status=? WHERE idcommand=?'
    db.query(q, ["cancelled", req.params.idcmd], (err, data) => {
        if(err) return(res.status(400).json(err))
        return(res.status(200).json("Command cancelled."))
    }) 
}

export const readCommand = (req, res) => {}