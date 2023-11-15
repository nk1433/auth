const express = require('express');
const router = express.Router();
const passport = require('passport'); // Make sure to import passport

// Middleware for JWT authentication
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Import the Organization model (assuming it's defined elsewhere in your code)
const Organization = require('../models/Organization'); // Update the path accordingly

// Get all organizations
router.get('/organizations', authenticateJWT, async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get an organization by id
router.get('/organizations/:id', authenticateJWT, async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            res.status(404).json({ message: 'Organization not found' });
        } else {
            res.status(200).json(organization);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an organization by id
router.put('/organizations/:id', authenticateJWT, async (req, res) => {
    try {
        const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!organization) {
            res.status(404).json({ message: 'Organization not found' });
        } else {
            res.status(200).json(organization);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an organization by id
router.delete('/organizations/:id', authenticateJWT, async (req, res) => {
    try {
        const organization = await Organization.findByIdAndDelete(req.params.id);
        if (!organization) {
            res.status(404).json({ message: 'Organization not found' });
        } else {
            res.status(200).json({ message: 'Organization deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
