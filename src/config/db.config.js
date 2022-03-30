import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  development: {
    HOST: process.env.DEV_DB_HOST,
    USER: process.env.DEV_DB_USER,
    PASSWORD: process.env.DEV_DB_PASS,
    DB: process.env.DEV_DB,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    HOST: process.env.PDN_DB_HOST,
    USER: process.env.PDN_DB_USER,
    PASSWORD: process.env.PDN_DB_PASS,
    DB: process.env.PDN_DB,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

export default dbConfig;
