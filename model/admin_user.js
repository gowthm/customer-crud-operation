const mongoose = require('mongoose');
const Schema = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,    
})
module.exports = userSchema;
module.exports = mongoose.model(
    'user', userSchema, 'user'); 
