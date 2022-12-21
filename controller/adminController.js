const express = require('express');
const router = express.Router();
const userSchema = require('../model/admin_user');

// Add Admin User

router.post('/add-admin', function(req, res) {
    const UserSchema = new userSchema;
    UserSchema.name = req.body.name;
    UserSchema.email = req.body.email;
    UserSchema.password = req.body.password;
    console.log(UserSchema)
    UserSchema.save(function(err, data) {
        if(err) {
            console.log('err', err);
        } else {
            const successRes = {
                status: 1,
                message: 'successfully added admin user.',
            }
            return res.status(200).send(successRes);
        }
    });
})

module.exports = router;