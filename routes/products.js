const express = require('express');
const router = express.Router();

// Sample products data
const products = [
    { id: 1, name: 'Kota Special', price: 45.00, category: 'kotas', stock: 50 },
    { id: 2, name: 'Classic Burger', price: 35.00, category: 'burgers', stock: 30 },
    { id: 3, name: 'Cheese Burger', price: 40.00, category: 'burgers', stock: 25 },
    { id: 4, name: 'Large Fries', price: 20.00, category: 'sides', stock: 100 },
    { id: 5, name: 'Soft Drink', price: 15.00, category: 'beverages', stock: 200 }
];

// Get all products
router.get('/', (req, res) => {
    res.json({
        message: 'Products retrieved with AI assistance',
        products: products,
        count: products.length,
        aiProcessed: true
    });
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
        product,
        aiProcessed: true
    });
});

module.exports = router;
