const express = require('express');
const router = express.Router();
const db = require('../config/connection');

const authController = require('../controllers/authController');

//Register
router.post('/register', authController.register)

//Login
router.post('/login', authController.login)

//Logout
router.post('/logout', authController.logout)

//RefreshToken
router.post('/refreshToken', authController.refreshToken)

// mysql test query for user table
router.get("/users", async (req, res) => {
  try{
    const [rows] = await db.query("SELECT * FROM customers");
    res.send({ users: rows });
}
catch(err){
    console.error("Error fetching users: ", err);
    res.status(500).json({ error: "Error fetching user" });
}
});

module.exports = router;