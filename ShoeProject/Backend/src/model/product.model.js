import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        trim:true,
        
    },
    productDescription:{
        type:String,
        trim:true,        
    },
    images:{
        type:[String]
    },
    category:{
        type:String,
        trim:true,
        enum:['men','women']
    },
    Subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory'
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reviwe'
    },


},{timestamps:true})

export default mongoose.model('Product',productSchema)