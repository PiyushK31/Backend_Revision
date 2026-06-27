const express = require('express');
const { read } = require('fs');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

// Import User model
const User = require('../Mongo_DB/usermodel.js');

//view engine:-
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public'))); 

//main route:-
app.get("/", (req,res)=>{
    res.render("index");
});

//Get all users route:-
app.get("/users", async (req, res)=>{
    try {
        const users = await User.find();
        res.render("read", { users: users });
    } catch (err) {
        console.log(err);
        res.render("read", { users: [] });
    }
});

// Create user route:-
app.post("/users", async (req, res)=>{
    try {
        const { name, email, imageurl } = req.body;
        const newUser = await User.create({
            name: name,
            email: email,
            imageurl: imageurl
        });
        res.redirect("/users");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// Create user route (alternate):-
app.post("/create", async (req, res)=>{
    try {
        const { name, email, imageurl } = req.body;
        const newUser = await User.create({
            name: name,
            email: email,
            imageurl: imageurl
        });
        res.redirect("/users");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

//read user route (legacy):-
app.get("/read", async (req, res)=>{
    try {
        const users = await User.find();
        res.render("read", { users: users });
    } catch (err) {
        console.log(err);
        res.render("read", { users: [] });
    }
});

// Delete user route:-
app.get("/delete/:id", async (req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/read");
});

//edit:-
app.get("/edit/:userid", async(req, res)=>{
    let user = await User.findById(req.params.userid);
    res.render("edit", {user});
});

//update:-
app.post("/update/:userid", async(req, res)=>{
    let {name, email, imageurl} = req.body;
    await User.findByIdAndUpdate(req.params.userid, {name, email, imageurl});
    res.redirect("/read");
});

app.listen(3000, (err)=>{
    if(err) {throw err.message}
    else console.log("server is running on port:3000");
    
});