// Import required modules
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import the User model
const userModle = require('./models/user');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(cookieParser()); // Parse cookies

// Home route
// Renders the registration page
app.get('/', (req, res) => {
    res.render('index');
});

// Create User Route
app.post('/Create', (req, res) => {

    // Get user data from the form
    let { username, email, password, age } = req.body;

    // Generate a salt for password hashing
    bcrypt.genSalt(10, (err, salt) => {

        // Hash the user's password
        bcrypt.hash(password, salt, async (err, hash) => {

            // Save user details in MongoDB
            let createdUser = await userModle.create({
                username,
                email,
                password: hash, // Store the hashed password instead of the original
                age
            });
            

            const token = jwt.sign({ email }, "secretkey");
            res.cookie("token", token);
            // Send the created user as a response
            res.send(createdUser);
        });
    });
});

app.get('/Login', (req, res) => {
    res.render('login');
});


app.post('/Login', async (req, res) =>{
    let user = await userModle.findOne({email: req.body.email});
    if(!user) return res.send("email or password is may wrong");

    bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({email: user.email}, "secretkey");
            res.cookie("token", token);
            res.send("You are logged in");
        }
        else return res.send("email or password is may wrong");
    });
});
app.get('/Logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});

// Start the server
app.listen(3000, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Server is running on port 3000");
    }
});