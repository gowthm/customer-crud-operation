const express = require('express')
const app = express();
const adminUser = require('./controller/adminController');
const bodyParser = require('body-parser');
const port = 3030;
const customer = require('./controller/customerController');
const mongoose = require('mongoose');
const connection = 'mongodb://localhost:27017/customer_user';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', adminUser);
app.use('/customer', customer)
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {
    if (error) {
        console.log('Error', error);
    }
}
);
app.listen(port, console.log('server started from ' + port));