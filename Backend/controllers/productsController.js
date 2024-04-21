const Product = require('../models/Product');
const Category = require('../models/Category');

console.log("HERE")
// Create a new product
exports.createProduct = async (req, res) => {
  try {
  
    // 
    const { name, description, categoryName, price, quantity } = req.body;
    console.log(req.body)
    //categoryName="Electronics"
    //const { filename } = req.file;
    // Find category by it's name
    //console.log(category)
    const category = await Category.findOne({ name: categoryName });
    //const warehouse = await Warehouse.findOne({ name: warehouseName });
    console.log(category, "Emd")
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // if (!warehouse) {
    //   return res.status(404).json({ message: 'Warehouse not found' });
    // }

    const newProduct = new Product({
      name,
      description,
      category: category._id, // Link category ID to the product
      price,
      quantity
      //warehouse: warehouse._id, // Link warehouse id with this product
      //image: filename,
    });

    const savedProduct = await newProduct.save();
    console.log(savedProduct)
    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
};

//get product by id
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//update product by id
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const { name, description, categoryName, warehouseName, price, quantity } = req.body;

    const updatedFields = {
      name: name || undefined,
      description: description || undefined,
      price: price || undefined,
      quantity: quantity || undefined,
    };

    if (categoryName) {
      const existingCategory = await Category.findOne({ name: categoryName });
      if (!existingCategory) {
        return res.status(400).json({ message: 'Invalid category' });
      }
      updatedFields.category = existingCategory._id;
    }

    if (warehouseName) {
      const existingWarehouse = await Warehouse.findOne({ name: warehouseName });
      if (!existingWarehouse) {
        return res.status(400).json({ message: 'Invalid warehouse' });
      }
      updatedFields.warehouse = existingWarehouse._id;
    }

    // if (req.file && req.file.filename) {
    //   updatedFields.image = req.file.filename;
    // }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




//delete product by id
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};






