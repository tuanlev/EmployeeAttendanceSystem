require('dotenv').config();


const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eas',
  port: parseInt(process.env.DB_PORT || '3306', 10)
};

export default dbConfig;
