// IMPORTING MONGOOSE
const mongoose = require ('mongoose');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mongodbpractice');

//create a schema for user
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
});

//create a model for user and export it to use in other files!
module.exports = mongoose.model('user', userSchema);