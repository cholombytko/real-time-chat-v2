const { Pool } = require("pg");
const config = require('../config');

const DATABASE_CONFIG = {
	user: config.DB.USERNAME,
	password: config.DB.PASSWORD,
	host: config.DB.HOST,
	port: config.DB.PORT,
	database: config.DB.NAME
};

const pool = new Pool({ ...DATABASE_CONFIG });

async function connect() {
	const extensionQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

	const createTableQuery1 = `
		CREATE TABLE IF NOT EXISTS messages (
			id SERIAL PRIMARY KEY,
			sender_username TEXT NOT NULL,
			chat_id UUID NOT NULL,
			message TEXT NOT NULL,
			timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			CONSTRAINT fk_chat_id FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
		);
	`;

	const createTableQuery2 = `
		CREATE TABLE IF NOT EXISTS chats (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			title TEXT UNIQUE NOT NULL 
		);
	`;

	await pool.query(extensionQuery);
 	await pool.query(createTableQuery2);
	await pool.query(createTableQuery1);
}

connect();
module.exports = pool;