import { Sequelize } from "sequelize";
import 'dotenv/dbConfig';
import dotenv from 'dotenv';
dotenv.config();

// const DATABASE_NAME = 'order_module';
// const DATABASE_USER = 'root';
// const DATABASE_PASSWORD = 'password123';

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
})

export default sequelize;