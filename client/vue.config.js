const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        style: path.resolve(__dirname, './src/assets/style/'),
      },
    },
  },
};
