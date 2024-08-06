const express=require('express')
const router=express.Router()
const userController=require('../controller/logic')
const User=require('../model/data')
router.post('/user/add-user',userController.adduser)
router.get('/user/get-users',userController.getElement)
router.delete('/user/delete-user/:id',userController.getDelete)
module.exports=router