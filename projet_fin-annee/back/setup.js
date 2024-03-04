import mysql from 'mysql2'
import cors from 'cors'
import express from 'express'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'

config();

export const db = mysql.createConnection({
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database:process.env.REACT_APP_DATABASE
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    };
    console.log('success');
});

export function createDB(port) {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())

    app.get('/cors', (req, res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send({ "msg": "This has CORS enabled 🎈" });
    });

    app.listen(port, () => {
        console.log("Backend started at port :", port)
    })
}