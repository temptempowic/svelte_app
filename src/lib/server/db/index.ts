import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Create connection pool
const connection = await mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'auction_db',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '3306')
});

export const db = drizzle(connection, { schema, mode: 'default' });