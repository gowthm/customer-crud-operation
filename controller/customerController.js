const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminValidation = require('../auth/validation');
const adminSchema = require('../model/admin_user');
const randomstring = require('randomstring');
const customerSchema = require('../model/customer');

// user login by get token

router.post('/user-login', async function (req, res) {
    let userEmail = req.body.email;
    let password = req.body.password;
    const adminUser = await adminSchema.findOne({ 'email': userEmail, 'password': password }).exec();
    if (!adminUser) {
        res.send('Cannot found the user');
    }
    if (adminUser) {
        const token = await jwt.sign({ email: userEmail, role: 'admin' }, '!!@#$%SWQ', { expiresIn: '24h' });
        if (token) {
            const successRes = {
                message: 'Successfully get token',
                tokenData: token,
            }
            return res.status(200).send(successRes);
        }
    }
});

// Add Customer Details 

router.post('/add', adminValidation, async function (req, res) {

    const CustomerSchema = new customerSchema
    CustomerSchema.name = req.body.name;
    CustomerSchema.email = req.body.email;
    CustomerSchema.customerId = randomstring.generate(5);
    CustomerSchema.phoneNo = req.body.phoneNo;
    CustomerSchema.address = req.body.address;
    console.log(CustomerSchema);
    CustomerSchema.save(function (err, data) {
        if (err) {
            console.log('err', err);
        } else {
            const successRes = {
                status: 1,
                message: 'successfully added customer.',
            }
            return res.status(200).send(successRes);
        }
    });
})

// Update Customer Details By Customer ID

router.put('/update', adminValidation, async function (req, res) {
    console.log(req.body.customerId);
    const find = await customerSchema.findOne({ 'customerId': req.body.customerId }).exec();
    if (find) {
        const updateRes = await customerSchema.updateOne({ customerId: req.body.customerId },
            { name: req.body.name, email: req.body.email, address: req.body.address, phoneNo: req.body.phoneNo }).exec();
        if (updateRes) {
            const successRes = {
                status: 1,
                message: 'successfully updated',
            }
            return res.status(200).send(successRes);
        }
    } else {
        const errRes = {
            status: 0,
            message: 'Cannot find customer ID',
        }
        return res.status(400).send(errRes);
    }
})

// Get Customer Details By Customer ID

router.get('/get-customer', adminValidation, async function (req, res) {
    const customerId = req.body.customerId;
    if (customerId) {
        const findDetail = await customerSchema.findOne({ 'customerId': req.body.customerId }).exec();
        if (findDetail) {
            const successRes = {
                status: 1,
                message: 'successfully get customer details',
                data: findDetail,
            }
            return res.status(200).send(successRes);
        } else  {
            const errRes = {
                status: 0,
                message: 'Cannot find customer ID',
            }
            return res.status(400).send(errRes);
        }
    } else {
        const errRes = {
            status: 0,
            message: 'Cannot find customer ID',
        }
        return res.status(400).send(errRes);
    }
})

// Delete Customer By Customer ID

router.delete('/delete-customer', adminValidation, async function (req, res) {
    const customerId = req.body.customerId;
    const findCustomer = await customerSchema.findOne({ 'customerId': req.body.customerId }).exec();
    if (findCustomer) {
        const deleteCustomer = await customerSchema.deleteOne({ 'customerId': req.body.customerId }).exec();
        if (deleteCustomer) {
            const successRes = {
                status: 1,
                message: 'successfully deleted customer',
            }
            return res.status(200).send(successRes);
        }
    } else {
        const errRes = {
            status: 0,
            message: "Cannot find customer ID"
        }
        return res.status(400).send(errRes)
    }
})

// Search Customer By Search Data

router.get('/customer-search', adminValidation ,async function (req, res) {
    const searchData = req.body.searchData;
    const customerDetail = await customerSchema.findOne({
        $or: [{ 'name': { $regex: '.*' + searchData + '.*' } },
        typeof searchData == 'number' ? { 'phoneNo': searchData } : { 'customerId': { $regex: '.*' + searchData + '.*' } }]
    }).exec();
    if (customerDetail) {
        const successRes = {
            status: 1,
            message: 'successfully get customer',
            data: customerDetail,
        }
        return res.status(200).send(successRes);
    }
    else {
        const errRes = {
            status: 1,
            message: 'successfully get customer',
            data: [],
        }
        return res.status(200).send(errRes);
    }
})

module.exports = router;





