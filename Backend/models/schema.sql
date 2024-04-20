-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS inventory_db;

-- Use the newly created database
USE inventory_db;

-- Create the customer table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL
);