/* eslint-disable import/prefer-default-export */
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import dbConfig from './db.config';

dotenv.config();

const env = process.env.ENV;
const dbEnv = dbConfig[env];

export const sequelize = new Sequelize(dbEnv.DB, dbEnv.USER, dbEnv.PASSWORD, {
  host: dbEnv.HOST,
  dialect: dbEnv.dialect || 'mysql',
  pool: {
    max: dbEnv.pool.max,
    min: dbEnv.pool.min,
    acquire: dbEnv.pool.acquire,
    idle: dbEnv.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
