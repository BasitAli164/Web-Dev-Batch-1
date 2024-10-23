import User from '../model/user.model.js'
export const addWishlist=async(res,req,next)=>{
    const {userId,productId}=req.params;
  
    try {
      const updateUser=new User.findByIdAndUpdate(
        userId,
        {
          $addToSet:{wishList:productId} // Adds prodId only if it's not already in the array
        },
        {
          new:true
  
        }
      )
      if(!updateUser){
        return res.status(404).json({
          status:404,
          message:"User not Found",
        })
      }
      res.status(201).json({
        status:201,
        message:"WishList add successfully.....",
        userDetail:updateUser
      })
      
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status:500,
        message:"Server side error",
        err:error.message,
      })
      
    }
  }
  export const removeWishlist=async(res,req,next)=>{
  const {userId,productId}=req.body;
  try {
    const deleteWishList=new User.findByIdAndUpdate(
      userId,
      {
        $pull:{wishList:productId}// Removes prodId from the array
      },
      {
        new:true
      }
  
    );
    if(!deleteWishList){
      return res.status(404).json({
        status:404,
        message:"User not Found",
      })
    }
    
    res.status(200).json({
      status:200,
      message:"WishList remove successfully.....",
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status:500,
      message:`Wishlist Successfully Removed which Id is:${userId}`,
      data:deleteWishList
    })
    
  }
  }