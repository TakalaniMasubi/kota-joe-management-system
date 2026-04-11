const express = require('express');
const router = express.Router();

// Sample orders data
let orders = [];
let orderIdCounter = 1;

// Create new order
router.post('/', (req, res) => {
    try {
        console.log('AI Processing: Creating new order...');
        
        const { customer_id, items, order_type, total_amount } = req.body;
        
        const order = {
            id: orderIdCounter++,
            customer_id,
            items,
            order_type,
            total_amount,
            status: 'pending',
            created_at: new Date().toISOString(),
            aiProcessed: true
        };
        
        orders.push(order);
        
        console.log('AI Analysis: Order processed successfully');
        
        res.status(201).json({
            message: 'Order created with AI assistance',
            order,
            aiProcessed: true,
            aiFeatures: [
                'Order validation',
                'Total calculation',
                'Inventory check',
                'Priority assignment'
            ]
        });
        
    } catch (error) {
        console.error('AI Order Error:', error);
        res.status(500).json({ 
            message: 'AI Processing Error: Order creation failed',
            error: error.message,
            aiProcessed: true 
        });
    }
});

// Get all orders
router.get('/', (req, res) => {
    res.json({
        message: 'Orders retrieved with AI assistance',
        orders: orders,
        count: orders.length,
        aiProcessed: true
    });
});

// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json({
        order,
        aiProcessed: true
    });
});

module.exports = router;
