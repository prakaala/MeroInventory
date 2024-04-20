const Product = require('../models/Product');
const Sales = require("../models/Sales");
// getall categories
exports.getAllSales = async (req, res) => {
  try{
    const sales = await Sales.find().populate('product');
    //console.log(categories)
    res.status(200).json(sales);
  } catch (err) {
    console.error("Error fetching categories:", err); // Log errors
    res.status(500).json({ error: 'Internal server error' });
  }
};


// create category
exports.createSales = async (req, res) => {
  const { product, quantity } = req.body;

  try {
  

    // const newSales = await Sales.create({ product, quantity});
    // const currentProduct = await Product.findById(product)
    // console.log(currentProduct)
  const currentProduct = await Product.findOne({ name: product });
  if (!currentProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (currentProduct.quantity < quantity) {
    return res.status(400).json({ message: 'Insufficient quantity' });
  }

  const newSales = await Sales.create({ product: currentProduct._id, quantity });

// Find the document by its ID and update its value
// Product.findByIdAndUpdate(product, { $set: { quantity: currentProduct.quantity-quantity } }, { new: true })
//   .then(updatedDocument => {
//     if (!updatedDocument) {
//       return res.status(404).json({ message: 'Document not found' });
//     }
//     res.status(200).json({ updatedDocument });
//   })
//   .catch(error => {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   });
    
//     res.status(201).json(newSales);


const updatedProduct = await Product.findByIdAndUpdate(
  currentProduct._id,
  { $inc: { quantity: -quantity } },
  { new: true }
);

res.status(201).json(newSales);

  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};




// exports.updateCategory = async (req, res ) => {
//   const categoryId = req.params.id;
//   const { name, description } = req.body;

//   try {
//     const updatedCategory = await Category.findByIdAndUpdate(
//       categoryId,
//       { name, description },
//       { new: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ error: 'Product category not found' });
//     }

//     res.json(updatedCategory);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// delete category
// exports.deleteSales = async (req, res) => {
//   const categoryId = req.params.id;

//   try {
//     const deletedCategory = await Category.findByIdAndDelete(categoryId);

//     if(!deletedCategory){
//       return res.status(404).json({error: 'Category not found'});
//     }
//     res.sendStatus(204);
//   }
  
//   catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// } 
