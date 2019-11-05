module.exports = function(api) {
    let presets = ['@babel/preset-react'];
    let plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'];

    if (api.env('test')) {
        presets.push([
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                },
                debug: true
            }
        ]);
        plugins.push('babel-plugin-dynamic-import-node');
    } else {
        presets.push([
            '@babel/preset-env',
            {
                // Allow importing core-js in entrypoint and use browserlist to select polyfills
                useBuiltIns: 'entry',
                corejs: { version: '3.3' },
                debug: true
            }
        ]);
    }
    return {
        presets,
        plugins
    };
};
