//set up express server !
const express = require('express');
const app = express();

//middelware setup
app.use(function(req , res , next){
    console.log("middelware is runnig!");
    //call the next function to move to the next middelware or route handler
    next();
});  

//set up a route and this is domain page!
app.get('/', function(req , res){
    res.send('It is Running');
});


//route for next page!
app.get('/nextpage', function(req , res){
    res.send("This is the next page which is also called Routes in Express");
})

//route for about page!
/*and suppose there is an error in this page we use error handling here for that we write next,
 res.status(500).send("There is an error in this page") 
and we can also write the error message in the console for debugging purpose! */
app.get('/about' , function(req , res , next){
    return next(new Error("There is an error in this page"));
});

//error handling!
app.use(function(err , req , res , next){
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
});

//running the server on port 3000
app.listen(3000, function(err){
    if (err) {
        throw console.error(err.message);
    }
    console.log('Server is running on port 3000');
});