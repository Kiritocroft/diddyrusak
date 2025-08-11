import mysql from 'mysql2/promise'
let pool: mysql.Pool | null = null; 
function initPool() {
    if(!pool) {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    return pool;
}

export async function db(){
    const connectionPool=initPool()
    return connectionPool.getConnection()
}