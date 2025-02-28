const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");


//put book to cart
router.get("/addtocart", authenticateToken, async(requestAnimationFrame,res)=>{
  try{
    const {bookid, id} = req.headers;
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    if(isBookinCart){
      return res.json({
        status: "Success",
        message:"Book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid},
    });

    return res.json({
      status: "Success",
      message:"Book added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});

//remove from cart
router.get("/removefromcart", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull:{cart:bookid},
    });
    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});


//get a cart of a user
router.get("/getcart", authenticateToken, async(req,res)=>{
  try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    return res.json({
      status: "Success",
      data: cart,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});
module.exports = router;