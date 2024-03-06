import express from 'express'
import { addProductSold, createCommand } from '../controllers/c-command.js'

const router = express.Router()

router.post('/newcommand:iduser', createCommand)
router.post('/sellprod:idcommand', addProductSold)

export default router