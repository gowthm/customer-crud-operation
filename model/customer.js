const mongoose = require('mongoose');
const Schema = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    customerId: String,
    phoneNo: Number,
    address: String,
})
module.exports = customerSchema;
module.exports = mongoose.model(
    'customer', customerSchema, 'customer'); 
