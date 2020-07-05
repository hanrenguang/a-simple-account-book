'use strict';

const { mysql } = require('../env.config.js');
const { host, port, username, password } = mysql;

exports.sequelize = {
  dialect: 'mysql',
  host,
  port,
  username,
  password,
  database: 'account-book-test',
  timezone: '+08:00',
};
