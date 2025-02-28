const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/Book");
const {authenticateToken} = require("./userAuth");

//adding books
router.post("/addBook", authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const user = await User.findById(id);
    if(user.role !== "admin"){
      return res
      .status(400)
      .json({message: "You are not authorized to add books."});
    }
      const book = new Book({
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price:req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      });
      await book.save();
      res.status(200).json({message:"Book added Successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  }
});

//updating book
router.put("/updateBook", authenticateToken, async (req, res) => {
  try {
    const {bookid} = req.headers;
    await Book.findByIdAndUpdate(bookid,{
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price:req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      });
      return res.status(200).json({
        message:"Book updated Successfully!",
      });
  } catch (error) {
    res.status(500).json({ message: "Error"});
  }
});

//delete book
router.delete("/deleteBook/:bookid", authenticateToken, async (req, res) => {
  try{
    const {bookid} = req.params;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "Book deleted Successfully",
      });
      } catch (error) {
        res.status(500).json({ message: "Error" });
        }
  });

//get all books
router.get("/getBooks",  async (req, res) => {
  try {
    const books = await Book.find().sort({creadtedAt:-1});
    return res.json({

    });
  } catch (error){
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
  }
});

//get recently added books limit 4
router.get("/getallbooks",  async (req, res) => {
  try {
    const book = await Book.find().sort({createdAt:-1}).limit(4);
    return res.json({
      status:"Success",
      data:book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});
    }
 });

 router.get("/get-book-by-id/:id", async (req, res) =>{
  try {
  const { id } = req.params;
  const book = await Book.findById(id);
  return res.json({
  status:"Success",
  data: book,
  });
  } catch (error) {
  console.log(error);
  return res.status(500).json({ message:"An error occurred" })
};
});
module.exports = router;