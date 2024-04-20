const connection = require('../config/connection');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;
    console.log(name, email, phone, address)
      // Check if required fields are present
      if (!name || !phone || !address) {
        return res.status(400).json({ message: 'Name and email are required.' });
      }
  
      // Prepare the SQL query
      const sql = 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)';
  
      // Execute the query
      connection.query(sql, [name, email, phone, address], (err, result) => {
        if (err) {
          console.log('Error: ', err);
          return res.status(500).json({ message: 'Failed to create customer.' });
        }
  
        // Return the newly created customer
        const newCustomer = { id: result.insertId, name, email, phone, address };
        res.status(201).json(newCustomer);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create customer.' });
    }
  };




// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
    const rows = connection.query('SELECT * FROM customers', (err, rows) => {
        if (err) {
            console.log("Error: ", err);
        }
        console.log(rows);
        res.status(200).json(rows);
    
    });
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch customers.' });
    }
};

// Get customer by id
exports.getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const rows = connection.query('SELECT * FROM customers WHERE id = ?',[customerId], (err, rows)=>{
            if(err){
                console.log('Error', err)
            }
            // if (rows.length === 0) {
            //     return res.status(404).json({ message: 'Customer not found' });
            // }
            res.status(200).json(rows);    
        });
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update customer by id
exports.updateCustomerByPhone = async (req, res) => {
    try {
      const { phone } = req.params;
      const { name, email, address } = req.body;
      console.log(req.body)
      // Check if at least one field is provided for update
      if (!name && !email && !address) {
        return res.status(400).json({ message: 'At least one field must be provided for update.' });
      }
  
      // Prepare the SQL query
      const query = 'UPDATE customers SET name = ?, email = ?, address = ? WHERE phone = ?';
  
      // Execute the query
      connection.query(query, [name, email, address, phone], (err, result) => {
        if (err) {
          console.log('Error: ', err);
          return res.status(500).json({ message: 'Failed to update customer.' });
        }
  
        // Check if any rows were affected
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Customer not found.' });
        }
  
        // Return the updated customer
        const updatedCustomer = { name, email, phone, address };
        res.status(200).json(updatedCustomer);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update customer.' });
    }
  };


// exports.updateCustomerById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, address, phone } = req.body;

//     // Check if at least one field is provided for update
//     if (!name && !email && !address && !phone) {
//       return res.status(400).json({ message: 'At least one field must be provided for update.' });
//     }

//     // Prepare the SQL query
//     const query = 'UPDATE customers SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?';

//     // Execute the query
//     connection.query(query, [name, email, address, phone, id], (err, result) => {
//       if (err) {
//         console.log('Error: ', err);
//         return res.status(500).json({ message: 'Failed to update customer.' });
//       }

//       // Check if any rows were affected
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'Customer not found.' });
//       }

//       // Return the updated customer
//       const updatedCustomer = { id, name, email, address, phone };
//       res.status(200).json(updatedCustomer);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update customer.' });
//   }
// };
  
// Delete customer by id
exports.deleteCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const result = connection.query('DELETE FROM customers WHERE id = ?', [customerId], (err)=>{
            if(err){
                console.log(err);
            }    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json({ success: true, message: 'Customer deleted successfully' });
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};