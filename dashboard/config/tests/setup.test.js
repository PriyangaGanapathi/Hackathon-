const { resolve } = require('path');
const envPath = resolve(__dirname, '../', 'environment', '.env');
const envTestPath = resolve(__dirname, '../', 'environment', '.env.test');
// Load test specify env configurations
require('dotenv-expand')(
    require('dotenv').config({
        path: envPath,
    })
);
require('dotenv-expand')(
    require('dotenv').config({
        path: envTestPath,
    })
);