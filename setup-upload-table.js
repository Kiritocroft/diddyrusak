const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupUploadTable() {
    let connection;
    try {
        // Create connection
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        console.log('✅ Database connection successful');

        // Check if table exists
        const [tables] = await connection.execute(
            "SHOW TABLES LIKE 'tb_upload'"
        );

        if (tables.length === 0) {
            console.log('❌ Table tb_upload does not exist');
            console.log('Creating table tb_upload...');
            
            await connection.execute(`
                CREATE TABLE tb_upload (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    judul VARCHAR(255) NOT NULL,
                    gambar VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            
            console.log('✅ Table tb_upload created successfully');
        } else {
            console.log('✅ Table tb_upload already exists');
        }

        // Show current data
        const [rows] = await connection.execute(
            "SELECT * FROM tb_upload"
        );
        
        console.log(`📊 Current data count: ${rows.length}`);
        if (rows.length > 0) {
            console.log('📋 Current data:');
            console.table(rows);
        }

    } catch (error) {
        console.error('❌ Database error:', error.message);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupUploadTable();