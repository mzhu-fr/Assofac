import express from 'express'
import { allUserExceptAdmin, deleteUser, showallExceptUser, superAdmin, superAdminUpdateUser, updatePassword, updateUser } from '../controllers/c-authentification.js'

const router = express.Router()

// READ
router.get('/users', allUserExceptAdmin)
router.get('/all-users/:id', superAdmin)
router.get('/employee', showallExceptUser)
router.put('/users/:id', updateUser)
router.put('/users-psswd/:id', updatePassword)
router.put('/all-users/:id/:role', superAdminUpdateUser)
router.delete('/all-users/:id', deleteUser)

export default router