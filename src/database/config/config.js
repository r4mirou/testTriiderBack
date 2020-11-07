require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: console.log, // eslint-disable-line
  },
  test: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST_TEST,
    database: process.env.POSTGRES_DB_TEST,
    username: process.env.POSTGRES_USER_TEST,
    password: process.env.POSTGRES_PASSWORD_TEST,
    logging: false,
  },
  production: {
    stConnection: 'postgres://ghfcpqsb:TUSwxCOrR0tCF_CGG11jZqLVHbM9VmYw@lallah.db.elephantsql.com:5432/ghfcpqsb',
    logging: false,
  },
};
