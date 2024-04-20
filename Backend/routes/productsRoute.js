const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
//const upload = require('../middleware/upload');
//const multer = require('multer');

// Create a new product post request
router.post('/create-product',productsController.createProduct);
//get all product get request
router.get('/getallproducts', productsController.getAllProducts);
//get product by id get request
router.get('/getproduct/:id', productsController.getProductById);
//update product by id put request
router.put('/updateproduct/:id',productsController.updateProductById);
//delete product by id delete request
router.delete('/deleteproduct/:id',productsController.deleteProductById)

//const uploadMulter = multer();
//router.use(express.json(), uploadMulter.none());

module.exports = router;
