const db = require("../config/database");

const Product = {
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },
  create: async (product) => {
    const { name, description, price } = product;
    const [result] = await db.query(
      "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
      [name, description, price]
    );
    return { id: result.insertId, ...product };
  },
  update: async (id, product) => {
    const { name, description, price } = product;
    await db.query(
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, id]
    );
    return { id, ...product };
  },
  delete: async (id) => {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return;
  },
};

module.exports = Product;
