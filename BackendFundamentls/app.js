const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
app.use(cookieParser());
const bcrypt = require("bcrypt");

//This is for cookies:-
// app.get("/", (req, res)=>{
//     res.cookie("name", "0099rui2gr9ug98g4#$%");
//     res.send("Check the Coookie");
//     // console.log(res.cookie)
// });

//HOW TO BCRYPT FOR ENCRIPTION-->>
app.get("/", function (req, res) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.send(err);

        bcrypt.hash("Piyush", salt, function (err, hash) {
            if (err) return res.send(err);
            console.log(hash);
            res.send(hash);
        });
    });
});

//how to bcrypt for decrypition:-
app.get("/check", (req, res) => {
    bcrypt.compare(
        "Piyush",
        "$2b$10$fpIwcUNWogl/tOKdLOMoY.KtuQGzKVm31xvyTIr6sdsQQkycGWssK",
        function (err, result) {
            if (err) return res.send(err);

            console.log(result);
            // res.send(result ? "Password Matched" : "Password Incorrect");
        }
    );
});

app.listen(3000, (err)=>{
    try {
        console.log("Server is Running on the port:3000");
    } catch (err) {
        console.log("There is some issue in the Server!");
    }
});