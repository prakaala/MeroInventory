const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customerController');

// Create a new customer post request
router.post('/create-customer', customersController.createCustomer);
//get all customer get request
router.get('/getallcustomers', customersController.getAllCustomers);
//get customer by id get request
router.get('/getcustomer/:id', customersController.getCustomerById);
//update customer by id put request
router.put('/updatecustomer/:id', customersController.updateCustomerByPhone);
//delete customer by id delete request
router.delete('/deletecustomer/:id', customersController.deleteCustomerById)


module.exports = router;
