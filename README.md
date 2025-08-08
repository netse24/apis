// ### How to Run Your API

// 1. Make sure you have a MySQL database created with a `products` table. Here's a sample SQL script:

// ```sql
// CREATE DATABASE your_database_name;
// USE your_database_name;

// CREATE TABLE products (
// id INT AUTO_INCREMENT PRIMARY KEY,
// name VARCHAR(255) NOT NULL,
// description TEXT,
// price DECIMAL(10, 2) NOT NULL,
// createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// ```

// 2. Fill in your database details in the `.env` file.
// 3. Run the server:

// `bash
//     npm start
//     `

// You now have a fully functional and well-structured Node.js Express API for handling product CRUD operations with a MySQL database. This structure provides a solid foundation that you can easily expand upon by adding new routes, controllers, services, and models for other resources.
