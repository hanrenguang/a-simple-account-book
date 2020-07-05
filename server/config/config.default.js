/* eslint valid-jsdoc: "off" */

'use strict';

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
      origin: 'http://localhost:8080',
      credentials: true,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
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
