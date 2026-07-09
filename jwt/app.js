//This code is all about JWT (JSON Web Token) authentication in a Node.js application. 

const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt"); // Not used yet
const path = require("path");

const app = express();

const pathToFile = path.join(__dirname, "users.json");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    let token = jwt.sign({email:"piyush@sample.in"}, "secret");
    res.cookie("token", token);
    res.send("Done👍");
});

app.get("/read", function(req, res){
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
});

app.listen(3000, (err) =>{
    if(err){
        console.log(err.message);
    }else{
        console.log("Server is running on port 3000");
    }
});