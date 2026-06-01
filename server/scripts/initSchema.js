/**
 * Initialize Database Schema
 * Creates all tables needed for APPLIASSIST
 */

const db = require('../config/db');

const initSchema = async () => {
  try {
    console.log('🔧 Initializing database schema...\n');

    const storeOwnersTable = `
      CREATE TABLE IF NOT EXISTS store_owners (
        store_owner_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        middle_name VARCHAR(50),
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        contact_number VARCHAR(15),
        address TEXT,
        account_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Creating store_owners table...');
    db.query(storeOwnersTable, (err, result) => {
      if (err) {
        console.error('❌ Error creating store_owners table:', err.message);
        process.exit(1);
      }
      console.log('✓ store_owners table ready\n');

      console.log('✅ Database schema initialized!');
      
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

initSchema();
