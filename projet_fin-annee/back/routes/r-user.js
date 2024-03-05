import express from 'express'
import { allUserExceptAdmin, deleteUser, superAdmin, superAdminUpdateUser, updatePassword, updateUser } from '../controllers/c-authentification.js'

const router = express.Router()

// READ
router.get('/users', allUserExceptAdmin)
router.get('/all-users', superAdmin)
router.put('/users/:id', updateUser)
router.put('/users-psswd/:id', updatePassword)
router.put('/all-users/:id', superAdminUpdateUser)
router.delete('/all-users/:id', deleteUser)

export default router