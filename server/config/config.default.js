/* eslint valid-jsdoc: "off" */

'use strict';

const { mysql, cors } = require('../env.config.js');
const { host, port, username, password } = mysql;
const { origin } = cors;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593586375290_8809';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    cors: {
      origin,
      credentials: true,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    sequelize: {
      dialect: 'mysql',
      host,
      port,
      username,
      password,
      database: 'account-book',
      timezone: '+08:00',
    },
    validate: {
      convert: true,
      widelyUndefined: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
