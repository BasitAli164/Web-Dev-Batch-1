import Product from '../model/product.model.js'
import Subcategories from '../model/subcategories.model.js'
import Reviwe from '../model/reviwe.model.js'


export const addproduct=async(req,res,next)=>{
    const {productName,productDescription,category,brand,color,size,stock,price,rating,comment}=req.body;
    console.log("req.body",req.body)
    
    try {
    let images=[];
        if(req.files){
            images=req.files.map((file)=>file.path);
        }
console.log("images",req.files)    
    const subCategory=new Subcategories({
            brand,
            color,
            size,
            stock,
            price,
            sku:req.body.sku,
        })
    const savedSubCategory=await subCategory.save();

        const review=new Reviwe({
            rating,
            comment,
        })
    const saveReview=await review.save();

      


    const product=new Product({
            productName,
            productDescription,
            category,
            images,
            Subcategory:savedSubCategory,
            review:saveReview,

        })

    // const saveProduct=await product.save();
    await product.save();

    res
    .status(201)
    .json({
        status:201,
        message:"Product add Successfully.........!",
        productDetail:product
    })
        
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            status:500,
            message:"Server side Error.........!",
            err:error
        })        
    }

}

export const getProductById=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const product=await Product.findById(id).populate('Subcategory').populate("review");
        if(!product){
            res
            .status(404)
            .json({
                status:404,
                message:"Product not Found.........!",
                })
        }

        res
        .status(200)
        .json({
            status:200,
            message:`Product get Successfully by Id: ${id}`,
            productDetail:product,
        })
        
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            status:500,
            message:"Server side Error.........!",
            err:error
        })        
        
    }
}




// Get all products

export const getProduct = async (req, res, next) => {
  try {
    const { size, color } = req.query;

    // Initialize conditions
    const subCategoryConditions = {};

    // Add condition for size if it's provided
    if (size) {
      subCategoryConditions.size = size;
    }

    // Add condition for color if it's provided
    if (color) {
      subCategoryConditions.color = color;
    }

    // Step 1: Find SubCategories that match the conditions
    const subCategories = await Subcategories.find(subCategoryConditions);

    // Step 2: Use the subcategory ObjectIds to filter Products
    const products = await Product.find({
      Subcategory: { $in: subCategories.map(sub => sub._id) }
    }).populate('Subcategory'); // Populate Subcategory to get full details

    res.status(200).json({
      message: "Products retrieved successfully.",
      status: 200,
      result: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      message: "Something went wrong.",
      status: 500,
      error: error.message,
    });
  }
};




  
export const updateProduct = async (req, res, next) => {
    const { name, description, category, ...others } = req.body;
  
    try {
      // Find product by ID and update it
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
          status: 404
        });
      }
  
      // Handle image update if provided
      let images = product.images;
      if (req.files) {
        images = req.files.map(file => file.path);
      }
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.images = images;
      Object.assign(product, others);
  
      await product.save();
  
      res.status(200).json({
        message: "Product updated successfully.",
        status: 200,
        result: product
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong.",
        status: 500,
        error: error.message
      });
    }
  };

export const deleteProduct=async(req,res,next)=>{
    const {id}=req.params;
 
    try {
        const product=await Product.findByIdAndDelete(id)
        if(!product){
             res
            .status(404)
            .json({
                status:404,
                message:"Product not Found.........!",
                })
        }

        res
        .status(200)
        .json({
            status:200,
            message:`Product delete Successfully by Id: ${id}`,
        })

        
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            status:500,
            message:"Server side Error.........!",
            err:error
        })  
        
    }
}
