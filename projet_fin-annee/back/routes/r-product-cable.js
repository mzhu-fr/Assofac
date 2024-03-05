import express from 'express'
import { createProductCable, deleteProductCable, getAvailableProductCable, getCCable, getIphoneCable, getMicroCable, updateProductCableInfo, updateStockage } from '../controllers/c-product-cable.js'

const router = express.Router()

router.post('/cable', createProductCable)
router.put('/cable/:id', updateProductCableInfo)
router.put('/cable:id', updateStockage)
router.delete('/cable/:id', deleteProductCable)
router.get('/cable', getAvailableProductCable)
router.get('/cablelightning', getIphoneCable)
router.get('/cableC', getCCable)
router.get('/cablemicro', getMicroCable)

export default router