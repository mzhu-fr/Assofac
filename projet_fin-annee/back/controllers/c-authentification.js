import { db } from "../setup.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// AUTHENTIFICATION 
export const register = (req, res) => {

    const q = 'SELECT * FROM `e-rigation`.`user` WHERE email=?'
    db.query(q, req.body.email, (err, data) => {
        if (err) return (res.status(400).json(err))
        if (data.length) return (res.status(400).json("Email already in use."))


        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);


        const q = 'INSERT INTO `e-rigation`.`user` (`nom`, `prenom`, `adresse`, `complement_adresse`, `code_postal`, `ville`, `telephone`, `email`, `password`) VALUES (?)'
        const user = [
            req.body.nom,
            req.body.prenom,
            req.body.adresse,
            req.body.complement_adresse,
            req.body.code_postal,
            req.body.ville,
            req.body.telephone,
            req.body.email,
            hash
        ]
        db.query(q, [user], (err, data) => {
            if (err) return (res.status(400).json(err))
            return (res.status(200).json("Registered."))
        })
    })

}

export const login = (req, res) => {
    const postLogin = async () => {
        const query = "SELECT * FROM `e-rigation`.`user` WHERE email = ?"
        db.query(query, [req.body.email], (err, data) => {

            if (err) return (res.status(400).json(err));
            if (data.length === 0) return res.status(400).json("Unkwown email.");

            // COMPARE PASSWORD
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if (!isPasswordCorrect) return res.status(400).json("Wrong email or password.");

            const { password, ...other } = data[0]
            const token = jwt.sign({ id: data[0].iduser }, "jwtkey");
            // const response = { ...other, authToken: token }
            res.cookie("login_token", token, {
                httpOnly: true
            }).status(200).json(other)
        })
    }
    postLogin();

}

export const logout = (req, res) => {
    res.clearCookie("login_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Disconnected.")
}

// READ UPDATE DELETE

// READ
export const allUserExceptAdmin = (req, res) => {
    const q = "SELECT * FROM `e-rigation`.`user` WHERE role='user'"
    db.query(q, (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}

export const superAdmin = (req, res) => {
    const q = "SELECT * FROM `e-rigation`.`user` WHERE iduser != ?"
    db.query(q, req.params.id, (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}
export const showallExceptUser = (req, res) => {
    const q = 'SELECT * FROM `e-rigation`.`user` WHERE role != ?'
    db.query(q, "user", (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json(data))
    })
}


// UPDATE
export const updateUser = (req, res) => {
    const user = [
        req.body.nom,
        req.body.prenom,
        req.body.adresse,
        req.body.complement_adresse,
        req.body.code_postal,
        req.body.ville,
        req.body.telephone,
        req.body.email,
        req.params.id
    ]
    const q = 'UPDATE `e-rigation`.`user` SET nom=?, prenom=?, adresse=?, complement_adresse=?, code_postal=?, ville=?, telephone=?, email=? WHERE iduser=?'
    db.query(q, [...user], (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("Profile updated."))
    })
}

export const superAdminUpdateUser = (req, res) => {
    const user = [
        req.params.role,
        req.params.id
    ]
    const q = 'UPDATE `e-rigation`.`user` SET role=? WHERE iduser=?'
    db.query(q, [...user], (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("Profile updated by Super Admin."))
    })
}

export const updatePassword = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const q = 'UPDATE `e-rigation`.`user` SET password=? WHERE iduser = ?'
    db.query(q, [hash, req.params.id], (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("Password updated."))
    })
}

// DELETE
export const deleteUser = (req, res) => {
    const q = 'DELETE FROM `e-rigation`.`user` WHERE iduser=?'
    db.query(q, req.params.id, (err, data) => {
        if (err) return (res.status(400).json(err))
        return (res.status(200).json("User deleted."))
    })
}
