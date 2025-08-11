const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
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
            "SHOW TABLES LIKE 'tb_kelas'"
        );

        if (tables.length === 0) {
            console.log('❌ Table tb_kelas does not exist');
            console.log('Creating table tb_kelas...');
            
            await connection.execute(`
                CREATE TABLE tb_kelas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    kode_ruangan VARCHAR(50) NOT NULL,
                    nama VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            
            console.log('✅ Table tb_kelas created successfully');
            
            // Insert sample data
            await connection.execute(`
                INSERT INTO tb_kelas (kode_ruangan, nama) VALUES 
                ('R001', 'Kelas A'),
                ('R002', 'Kelas B'),
                ('R003', 'Kelas C')
            `);
            
            console.log('✅ Sample data inserted');
        } else {
            console.log('✅ Table tb_kelas already exists');
        }

        // Show current data
        const [rows] = await connection.execute(
            "SELECT * FROM tb_kelas"
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

setupDatabase();