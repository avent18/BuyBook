/** @format */

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./userAuth")

//sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters long" });
    }

    //checking username existence
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "username already exists" });
    }
    //checking email existence
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //check password length
    if (password.length <= 8) {
      return res
        .status(400)
        .json({ message: "The message length must be greator than 8" });
    }

     const hashPass = await bcrypt.hash(password, 10);
    //newUser created
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });

    await newUser.save();
    return res.status(200).json({message:"SignUp Successfull"})
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


//sign in
router.post("/sign-in", async (req, res) => {
  try {
    const {username, password} = req.body;

    const existingUser = await User.findOne({username});
    if (!existingUser) {
      res.status(400).json({message:"Invalid Username"});
    }

    await bcrypt.compare(password, existingUser.password, (err, data)=>{
      if(data){
        const authClaims = [
          {
            name:existingUser.username
          },
          {
            role:existingUser.role
          },
        ];
        //bookStore123 is the key
        const token = jwt.sign({authClaims},"bookStore123",{
          expiresIn:"30m",
        });
        res.status(200).json({
          id:existingUser._id,
          role:existingUser.role,
          token:token,
        });
      } else {
        res.status(400).json({message:"Invalid Password"});
      }
    });
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get user information
router.get("/user-info", authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
 });

 //updating address
 router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const {address} = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {address}, {new: true});
    return res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({message:"Internal Server Error"});
    }
 });
module.exports = router;
