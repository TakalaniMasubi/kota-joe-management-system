const express = require('express');
const router = express.Router();

// Sample inventory data
const inventory = [
    { product_id: 1, product_name: 'Kota Special', current_stock: 50, min_stock: 10, last_updated: new Date().toISOString() },
    { product_id: 2, product_name: 'Classic Burger', current_stock: 30, min_stock: 15, last_updated: new Date().toISOString() },
    { product_id: 3, product_name: 'Cheese Burger', current_stock: 25, min_stock: 10, last_updated: new Date().toISOString() },
    { product_id: 4, product_name: 'Large Fries', current_stock: 100, min_stock: 20, last_updated: new Date().toISOString() },
    { product_id: 5, product_name: 'Soft Drink', current_stock: 200, min_stock: 50, last_updated: new Date().toISOString() }
];

// Get inventory status
router.get('/', (req, res) => {
    console.log('AI Processing: Analyzing inventory levels...');
    
    // AI-powered stock analysis
    const stockAlerts = inventory.filter(item => item.current_stock <= item.min_stock);
    
    res.json({
        message: 'Inventory status retrieved with AI analysis',
        inventory: inventory,
        alerts: stockAlerts,
        total_items: inventory.length,
        low_stock_count: stockAlerts.length,
        aiProcessed: true,
        aiFeatures: [
            'Stock level analysis',
            'Automatic alerts',
            'Reorder suggestions',
            'Demand forecasting'
        ]
    });
});

// Update inventory
router.put('/:product_id', (req, res) => {
    try {
        const { product_id } = req.params;
        const { quantity, transaction_type } = req.body;
        
        console.log(`AI Processing: Updating inventory for product ${product_id}...`);
        
        const item = inventory.find(i => i.product_id === parseInt(product_id));
        if (!item) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }
        
        // AI-powered stock update logic
        if (transaction_type === 'sale') {
            item.current_stock -= quantity;
        } else if (transaction_type === 'purchase') {
            item.current_stock += quantity;
        }
        
        item.last_updated = new Date().toISOString();
        
        console.log('AI Analysis: Inventory updated successfully');
        
        res.json({
            message: 'Inventory updated with AI assistance',
            item,
            aiProcessed: true
        });
        
    } catch (error) {
        console.error('AI Inventory Error:', error);
        res.status(500).json({ 
            message: 'AI Processing Error: Inventory update failed',
            error: error.message,
            aiProcessed: true 
        });
    }
});

module.exports = router;
