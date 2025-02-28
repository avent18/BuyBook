const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/Book");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/placeOrder", authenticateToken, async(req, res)=>{
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for(const orderData of order){
      const newOrder = new Order({user:id, book:orderData._id});
      const orderDataFromDb = await newOrder.save();
      //saving order in user model
      await User.findByIdAndUpdate(id,{
        $push: { cart:orderDataFromDb.id},
      });
      //clearing cart
      await User.findByIdAndUpdate(id,{
        $pull: { cart:orderData._id },
      });
    }
    return res.json({
      status:"Success",
      message: "Order placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});

//get order history of a user
router.get("/getorderhistory", authenticateToken, async(req, res)=>{
  try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate({
      path:"orders",
      populate: {path:"book"},      
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status:"Success",
      data:ordersData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});

//getAll orders --admin
router.get("/getallusers", authenticateToken, async(req, res)=>{
  try {
    const userData = await Order.find()
    .populate({
      path:"user",
    })
    .sort({
      createdAt: -1
    });
    return res.json({
      status:"Success",
      data:userData
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});


//update order --admin
router.put("/updateorderstatus/:id", authenticateToken, async(req, res)=>{
  try {
    const {id} = req.params;
    await Order.findByIdAndUpdate(id,{status:req.body.status});
    return res.json({
      status:"Success",
      message:"Status updated Successfully",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});
module.exports = router