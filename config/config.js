const dotenv = require("dotenv");

const envFound = dotenv.config();
if (!envFound) {
  throw new Error(" Couldn't find .env file!");
}

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    port: process.env.DB_DEV_PORT,
    dialect: "postgres",
    ssl:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
    define: {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    dialectOptions: {
      supportBigNumbers: true,
    },
    underscored: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 20000,
    },
    logging: process.env.NODE_ENV === "production" ? false : console.log,
  },
  test: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    port: process.env.DB_DEV_PORT,
    dialect: "mysql",
    ssl:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
    define: {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    dialectOptions: {
      supportBigNumbers: true,
    },
    underscored: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 20000,
    },
    logging: process.env.NODE_ENV === "production" ? false : console.log,
  },
  production: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    port: process.env.DB_DEV_PORT,
    dialect: "mysql",
    ssl:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
    define: {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    dialectOptions: {
      supportBigNumbers: true,
    },
    logging: true,
    underscored: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 20000,
    },
    logging: process.env.NODE_ENV === "production" ? false : console.log,
  },
};
