const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
require("./dbConnect/connectdb");
const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourites");
const  Cart = require("./routes/cart");
const Orders = require("./routes/order")

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
//routes
app.use("/api/v1",user);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Orders);

app.get("/", (req, res)=>{
  res.send("This is Naveen's Home page")
})


//creating port
app.listen(port, ()=>{
  console.log(`The port is running on ${port}`);
})