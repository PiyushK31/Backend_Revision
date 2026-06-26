const express = require ('express');
//importing usermodel
const mongoose = require ('mongoose');
//importing usermodel
const userModel = require ('./usermodel');
//create an express app
const app = express();


// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mongodbpractice");

// Middleware
app.use(express.json());

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String
});

// Model
const userModel = mongoose.model("user", userSchema);

// =====================
// CREATE
// =====================
app.get("/create", async (req, res) => {
    const user = await userModel.create({
        name: "Piyush Kumar",
        username: "Piyush_01",
        email: "piyush@gmail.com"
    });

    res.send(user);
});

// =====================
// READ ALL
// =====================
app.get("/read", async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});

// =====================
// READ ONE
// =====================
app.get("/readone", async (req, res) => {
    const user = await userModel.findOne({
        username: "Piyush_01"
    });

    res.send(user);
});

// =====================
// UPDATE
// =====================
app.get("/update", async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate(
        { username: "Piyush_01" },
        { name: "Piyush Kumar Updated" },
        { new: true }
    );

    res.send(updatedUser);
});

// =====================
// DELETE
// =====================
app.get("/delete", async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({
        username: "Piyush_01"
    });

    res.send(deletedUser);
});

// Server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});