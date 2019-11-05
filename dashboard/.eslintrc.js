//Disable jsx-a11y
let a11yRules = {};
Object.keys(require('eslint-plugin-jsx-a11y').rules).forEach(rule => {
    a11yRules[`jsx-a11y/${rule}`] = 'off';
});

module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    globals: {
        window: true,
        document: true,
        localStorage: true
    },
    extends: ['airbnb', 'airbnb/hooks'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 9,
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-one-expression-per-line': 'off',
        'react/prop-types': 'off',
        'space-before-function-paren': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        ...a11yRules
    }
};
