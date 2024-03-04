import { db } from "../setup.js"

export const register = (req, res) => {

    const q = 'SELECT FROM `e-rigation`.`user` where email=?'
    db.query(q, req.body.email, (err, data) => {
        if (err) return(res.status(400).json(err))
        if (data.length) {
            return(res.status(200).json("Email already in use"))
        }

    })

}

export const login = (req, res) => {}

export const logout = (req, res) => {}