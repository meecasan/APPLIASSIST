const db = require('../config/db');
const { getIO } = require('../realtime');

// Get all pending technicians
exports.getPendingTechnicians = (req, res) => {
  const sql = `SELECT technician_id, first_name, middle_name, last_name, email, contact_number, specialization, service_area, account_status FROM technicians WHERE account_status = 'Pending'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results || []);
  });
};

// Get all pending store owners
exports.getPendingStoreOwners = (req, res) => {
  const sql = `SELECT store_owner_id, first_name, middle_name, last_name, email, contact_number, address, account_status FROM store_owners WHERE account_status = 'Pending'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results || []);
  });
};

// Get all rejected technicians
exports.getRejectedTechnicians = (req, res) => {
  const sql = `SELECT technician_id, first_name, middle_name, last_name, email, contact_number, specialization, service_area, account_status FROM technicians WHERE account_status = 'Rejected'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results || []);
  });
};

// Get all rejected store owners
exports.getRejectedStoreOwners = (req, res) => {
  const sql = `SELECT store_owner_id, first_name, middle_name, last_name, email, contact_number, address, account_status FROM store_owners WHERE account_status = 'Rejected'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results || []);
  });
};

// Approve technician
exports.approveTechnician = (req, res) => {
  const { technician_id } = req.params;
  const sql = `UPDATE technicians SET account_status = 'Approved' WHERE technician_id = ?`;
  db.query(sql, [technician_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Technician not found' });
    
    // Emit real-time event
    getIO()?.rt.userApproved({ user_id: technician_id, role: 'technician' });
    
    res.json({ message: 'Technician approved successfully' });
  });
};

// Approve store owner
exports.approveStoreOwner = (req, res) => {
  const { owner_id } = req.params;
  const sql = `UPDATE store_owners SET account_status = 'Approved' WHERE store_owner_id = ?`;
  db.query(sql, [owner_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Store owner not found' });
    
    // Emit real-time event
    getIO()?.rt.userApproved({ user_id: owner_id, role: 'shop-owner' });
    
    res.json({ message: 'Store owner approved successfully' });
  });
};

// Reject technician
exports.rejectTechnician = (req, res) => {
  const { technician_id } = req.params;
  const sql = `UPDATE technicians SET account_status = 'Rejected' WHERE technician_id = ?`;
  db.query(sql, [technician_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Technician not found' });
    
    // Emit real-time event
    getIO()?.rt.userRejected({ user_id: technician_id, role: 'technician' });
    
    res.json({ message: 'Technician rejected' });
  });
};

// Reject store owner
exports.rejectStoreOwner = (req, res) => {
  const { owner_id } = req.params;
  const sql = `UPDATE store_owners SET account_status = 'Rejected' WHERE store_owner_id = ?`;
  db.query(sql, [owner_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Store owner not found' });
    
    // Emit real-time event
    getIO()?.rt.userRejected({ user_id: owner_id, role: 'shop-owner' });
    
    res.json({ message: 'Store owner rejected' });
  });
};
