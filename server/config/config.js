(() => {
    const config = {}
    config.PORT = process.env.PORT || 5500
    config.ROOT = 'views'
    config.LOG_FILE = 'server/log/node.js.log'
    module.exports = config
})()
