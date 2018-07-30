require('dotenv').config();

const env = process.env.NODE_ENV;

const dev = {
  db: {
    uri: process.env.DB_URI_DEV,
  },
};

const test = {
  db: {
    uri: process.env.DB_URI_TEST,
  },
};

const prod = {
  db: {
    uri: process.env.DB_URI_PROD,
  },
};

const config = {
  dev,
  test,
  prod,
};

module.exports = config[env];
