const express = require("express");
const app = express();

//view engine setup
app.set("view engine", "ejs");

//static files setup
app.use(express.static("public"));
app.get("/", function(req, res){
    res.render('index');
});

//dynamic routeing!
app.get("/user/:username/:age" , function(req , res){
    res.send("welcome to the profile of " + req.params.username + " and your age is " + req.params.age);
});

app.listen(3000, function(err){
    if(err){
        console.log("Error starting server:", err);
    } else {
        console.log("Server is running on port 3000");
    }
});