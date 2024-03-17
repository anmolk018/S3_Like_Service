require('dotenv/config');

module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true
  },
};