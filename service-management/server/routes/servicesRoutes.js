const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const validate = require('../middleware/validate');
const serviceSchemas = require('../validation/serviceSchemas');

// Create service request - customers and admins
router.post('/', authMiddleware, role(['customer','admin']), validate(serviceSchemas.createService), servicesController.createServiceRequest);

// List services - admin, technician, shop-owner (with filtering options)
router.get('/', authMiddleware, role(['admin','technician','shop-owner']), servicesController.listServices);

// Get service requests for a specific store (for shop owners)
router.get('/store/:store_id', authMiddleware, role(['admin','shop-owner']), servicesController.getStoreServiceRequests);

// Get service by ID - requires authentication
router.get('/:id', authMiddleware, servicesController.getService);

// Assign technician to a service request - admin and shop owners only
router.put('/:id/assign', authMiddleware, role(['admin','shop-owner']), validate(serviceSchemas.assignTechnician), servicesController.assignTechnician);

// Update service request status - admin, technician (only their assigned), shop-owner
router.put('/:id/status', authMiddleware, role(['admin','technician','shop-owner']), validate(serviceSchemas.updateStatus), servicesController.updateStatus);

// Delete service request - admin only
router.delete('/:id', authMiddleware, role(['admin']), servicesController.deleteService);

module.exports = router;
