import express from 'express'
import { addProduct, delProduct, getProduct, updateProduct } from '../controller/product.controller.js'
import { upload } from '../middlewares/multer.middleware.js';

const routerPro=express.Router()

routerPro.post('/add',upload.array("images",10),addProduct);
routerPro.get('/get/:id',getProduct);
routerPro.delete('/del/:id',delProduct);
routerPro.put('/update/:id',upload.array("images",10),updateProduct)

export default routerPro;