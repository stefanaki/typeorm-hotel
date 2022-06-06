import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const DB_TYPE = process.env.DB_TYPE === 'mysql' ? 'mysql' : 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'asdf';

const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

const SERVER_PORT = process.env.SERVER_PORT
	? Number(process.env.SERVER_PORT)
	: 1337;

export const server = {
	port: SERVER_PORT
};

export const appDataSource = new DataSource({
	type: DB_TYPE,
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	synchronize: true,
	logging: false,
	entities: [__dirname + '/../entities/*.ts']
});
