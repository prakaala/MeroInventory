const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Get all cateogries
router.get('/getallcategories', categoryController.getAllCategory);

router.post('/addProduct',categoryController.addProduct );

// Create a new category
router.post('/create-category', categoryController.createCategory);

// update category
router.put('/update-category/:id', categoryController.updateCategory);

// delete category
router.delete('/delete-category/:id', categoryController.deleteCategory);


module.exports = router;