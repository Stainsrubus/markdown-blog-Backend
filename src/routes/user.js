import express from 'express'
import UserController from '../controllers/users.js'
import Auth from '../common/auth.js'

const router = express.Router()

router.post('/signup',UserController.signup)
router.post('/create',UserController.create)

router.post('/login',UserController.login)
router.get('/getusers',Auth.validate,Auth.adminGaurd,UserController.getAllUsers)
router.get('/getuser/:id',Auth.validate,Auth.adminGaurd, UserController.getUserById)
router.put('/edituser/:id',Auth.validate,Auth.adminGaurd, UserController.editUser)
router.delete('/deleteuser/:id', Auth.validate, Auth.adminGaurd, UserController.deleteUserById);

export default router