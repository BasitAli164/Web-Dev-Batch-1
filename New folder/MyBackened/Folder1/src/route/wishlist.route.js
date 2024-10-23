import express from 'express'
import { addWishlist, removeWishlist } from '../controller/wishList.controller.js';

const wishRoute=express.Router();

wishRoute.post('/addWish',addWishlist);
wishRoute.delete('/delWish',removeWishlist)

export default wishRoute;