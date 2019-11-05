const webpackMerge = require('webpack-merge');
const common = require('./config/webpack/webpack.common');

const getAddons = (addonsArgs) => {
    const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];
    return addons
        .filter(Boolean)
        .map((name) => require(`./config/webpack/addons/webpack.${name}.js`));
};

/* eslint-disable global-require,import/no-dynamic-require */
const env = process.env.NODE_ENV || 'development';

module.exports = ({ addon } = {}) => {
    const envConfig = require(`./config/webpack/webpack.${env}`);
    return webpackMerge(common, envConfig, ...getAddons(addon));
};
