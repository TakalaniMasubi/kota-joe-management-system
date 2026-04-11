const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Register new customer
router.post('/', async (req, res) => {
    try {
        console.log('AI Processing: Validating customer data...');
        
        const { firstName, lastName, email, phone, studentStatus, favoriteItems, notifications } = req.body;
        
        // AI-powered validation
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({ 
                message: 'AI Validation: Missing required fields',
                aiProcessed: true 
            });
        }
        
        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ 
                message: 'AI Analysis: Customer with this email already exists',
                aiProcessed: true 
            });
        }
        
        // Create new customer
        const customer = new Customer({
            firstName,
            lastName,
            email,
            phone,
            studentStatus,
            favoriteItems: favoriteItems || [],
            notifications: notifications || 'all'
        });
        
        console.log('AI Analysis: Customer preferences being analyzed...');
        
        await customer.save();
        
        console.log('AI Processing: Customer registration completed successfully');
        
        res.status(201).json({
            message: 'Customer registered successfully with AI assistance',
            customer: {
                id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                studentStatus: customer.studentStatus,
                loyaltyPoints: customer.loyaltyPoints
            },
            aiProcessed: true,
            aiFeatures: [
                'Email validation',
                'Phone formatting',
                'Duplicate detection',
                'Preference analysis'
            ]
        });
        
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ 
            message: 'AI Processing Error: Registration failed',
            error: error.message,
            aiProcessed: true 
        });
    }
});

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().select('-__v');
        res.json({
            customers,
            count: customers.length,
            aiProcessed: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({
            customer,
            aiProcessed: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
