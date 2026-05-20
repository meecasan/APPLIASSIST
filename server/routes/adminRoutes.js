const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get pending users for approval
router.get('/pending/technicians', adminController.getPendingTechnicians);
router.get('/pending/store-owners', adminController.getPendingStoreOwners);

// Get rejected users
router.get('/rejected/technicians', adminController.getRejectedTechnicians);
router.get('/rejected/store-owners', adminController.getRejectedStoreOwners);

// Approve applications
router.put('/approve/technician/:technician_id', adminController.approveTechnician);
router.put('/approve/store-owner/:owner_id', adminController.approveStoreOwner);

// Reject applications
router.put('/reject/technician/:technician_id', adminController.rejectTechnician);
router.put('/reject/store-owner/:owner_id', adminController.rejectStoreOwner);

module.exports = router;
