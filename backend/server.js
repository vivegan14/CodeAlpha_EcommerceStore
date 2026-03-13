const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* ------------------ MongoDB Connection ------------------ */

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ------------------ Product Schema ------------------ */

const ProductSchema = new mongoose.Schema({
name: String,
price: Number,
image: String
});

const Product = mongoose.model("Product", ProductSchema);

/* ------------------ User Schema ------------------ */

const UserSchema = new mongoose.Schema({
name: String,
email: String,
password: String
});

const User = mongoose.model("User", UserSchema);

/* ------------------ Product Routes ------------------ */

app.get("/products", async (req, res) => {

const products = await Product.find();

res.json(products);

});

/* ------------------ Register Route ------------------ */

app.post("/register", async (req, res) => {

const { name, email, password } = req.body;

const newUser = new User({
name,
email,
password
});

await newUser.save();

res.json({ message: "User registered successfully" });

});

/* ------------------ Login Route ------------------ */

app.post("/login", async (req, res) => {

const { email, password } = req.body;

const user = await User.findOne({ email, password });

if(user){
res.json({ message: "Login successful" });
}
else{
res.json({ message: "Invalid email or password" });
}

});

/* ------------------ Server ------------------ */

app.listen(5000, () => {
console.log("Server running on port 5000");
});