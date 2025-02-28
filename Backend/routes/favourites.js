const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//add book to favourite
router.put("/favourites", authenticateToken, async(req, res) => {
  try{
    const { bookid, id } = req.headers;
    const userdata = await User.findById(id);
    const isBookfavourite = userdata.favourites.includes(bookid);
    if(isBookfavourite){
      return res.status(200).json({message:"Book is already in favourites"});
    }
    await User.findByIdAndUpdate(id, {$push:{favourites:bookid}});
    return res.status(200).json({message:"Book added to favourites"});
  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
});

//deleting from favourites
router.put("/deletefavourites", authenticateToken, async(req, res) => {
  try{
    const { bookid, id } = req.headers;
    const userdata = await User.findById(id);
    const isBookfavourite = userdata.favourites.includes(bookid);
    if(isBookfavourite){
      await User.findByIdAndUpdate(id, {$pull:{favourites:bookid}});
    }
    
    return res.status(200).json({message:"Book deleted from favourites"});
  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
});

//get favourite book of a user
router.get("/getfavourite",authenticateToken, async(req, res)=>{
  try{
    const {id} = req.headers;
    const userdata = await User.findById(id).populate("favourites");
    const favouriteBooks = userdata.favourites;
    return res.json({
      status:"Success",
      data:favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"error occured"});
  }
});
module.exports = router;