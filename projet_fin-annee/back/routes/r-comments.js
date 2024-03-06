import express from 'express'
import { createComment, deleteComment, showBestComment, showProductComment, showUserComment, updateComment } from '../controllers/c-comments.js'

const router = express.Router()

router.post('/comment:iduser/:idprod', createComment)
router.get('/user:iduser', showUserComment)
router.get('/best-com', showBestComment)
router.get('/prodcom', showProductComment)
router.put('/comment:idcom', updateComment)
router.delete('/comment:idcom', deleteComment)

export default router