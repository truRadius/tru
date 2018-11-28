// load the default config generator.
const path = require("path");

const myConfig = require('../config/webpack.config.dev.js');

module.exports = (config, env, defaultConfig) => {
  
  defaultConfig.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: path.resolve(__dirname, '../src'),
    loader: require.resolve('babel-loader'),
  });
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  return defaultConfig
};
