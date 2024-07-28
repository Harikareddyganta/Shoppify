const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { log } = require("console");

//the request are trasnformed to json format
app.use(express.json());
//3000 front-end  4000 back-end communication
app.use(cors());
//database connection
mongoose.connect(
  "mongodb+srv://gantaharikareddy:harika123456@cluster0.rvhqmmj.mongodb.net/ecommerce"
);

//api creation
app.get("/", (req, res) => {
  res.send("express app is running");
});

//schema for creating products
const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//addProduct
app.post("/addProduct", async (req, res) => {
  //to inc id automatically
  //this will give all documents in database
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    //getting last element of model
    let lastproduct_array = products.slice(-1);
    //accessing id
    let lastproduct = lastproduct_array[0];
    id = lastproduct.id ? lastproduct.id + 1 : 1;
  } else id = 1;
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({ success: true, name: req.body.name });
});

//api for deleting products
app.post("/removeProduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({ sucess: true, name: req.body.name });
});

//Image storage i.e. upload product
const imageStorage = multer.diskStorage({
  destination: "./Upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: imageStorage });

app.use("/images", express.static("Upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

//view all products
app.get("/allProduct", async (req, res) => {
  let products = await Product.find({});
  console.log("All products");
  res.send(products);
});

//schema for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  CartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//api endpoint for user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Existing User Found" });
  }

  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    CartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for new collection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collections Fetched");
  res.send(newcollection);
});

//creating endpoint for popular in women
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("Popular in Women Fetched");
  res.send(popularinwomen);
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please Authenticate using valid token" });
  } else {
    try {
      //token will be decoded
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please Authenticate using a valid token" });
    }
  }
};

//creating endpoint to get cart data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.CartData);
});

//creating endpoint for adding product to card data
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.CartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { CartData: userData.CartData }
  );
  res.send("added");
});

//creating endpoint for removing product from card data
app.post("/removefromcart", async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.CartData[req.body.itemId] > 0) {
    userData.CartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { CartData: userData.CartData }
  );
  res.send("removed");
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server running on port ${PORT}`);
  } else {
    console.log("Error", err);
  }
});
