const express = require('express');
const app = express();

//user modle:-
const userModel = require('./models/user');
//post modle:-
const postModel = require('./models/post'); 

app.get('/' , (req, res) => {
    res.send('sup nga');
});

app.get("/Create", async function(req, res) {
    let user = await userModel.create({
        username: "John",
        email: "John@email.com",
        age: 23
    });
    res.send(user);
});


app.get("/post/create/", async function(req, res) {
    let post = await postModel.create({
        postdata: "Done",
        user: "6a58e36591c1610fcd1ce27a",
        age: 23
    });

    let user = await userModel.findOne({_id: "6a58e36591c1610fcd1ce27a"});
    user.posts.push(post._id);
    res.send({post, user});
})

app.listen(3000, (err) =>{
    if(err) return console.log(err.cause);
    else{console.log("server is running on port 3000")}
});