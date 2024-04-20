const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');


// Create a new post request
router.post('/create-sale',salesController.createSales);
//get all sales get request
router.get('/getallsales', salesController.getAllSales);


module.exports = router;
