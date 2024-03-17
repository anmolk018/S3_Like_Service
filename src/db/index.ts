import { Sequelize } from 'sequelize';
import 'dotenv/config'
import path from 'path'

interface config {
  dialect: 'mysql' | 'postgres';
  host: string;
  port: number;
  username: string;
  password?: string;
  database: string;
  logging: boolean;
}

const sequelizeOptions: config = {
  dialect: (process.env.DIALECT as 'mysql' | 'postgres') || "postgres",
  host: process.env.HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.USER_NAME || "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE || "test",
  logging: process.env.LOGGING == "true" ? true : false,
}

const sequelize = new Sequelize(sequelizeOptions)

const db = { sequelize }

export default db;


