import express from 'express'
import { delUserbyId, login, register, updateUserbyId, viewAllUser, viewUserbyId } from '../controller/user.controller.js'


const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/get/:id',viewUserbyId)
router.get('/get',viewAllUser)
router.delete('/del/:id',delUserbyId)
router.put('/update/:id',updateUserbyId)

export default  router