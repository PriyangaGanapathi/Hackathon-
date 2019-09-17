module.exports = {
    apps: [
        {
            name: 'PPUMockServer',
            script: 'mock-server/bin/www',
            watch: ['mock-server'],
            env: {
                PORT: 3001,
                NODE_ENV: 'development'
            }
        }
    ]
};
