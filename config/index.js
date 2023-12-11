require('dotenv').config()

module.exports = {
    log_level: process.env.LOG_LEVEL || 'dev',
    "nodejs": {
        host: process.env.APP_HOST || 'localhost',
        port: process.env.APP_PORT || 3001,
    },
    "mongodb": {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        dbName: process.env.DB_NAME || 'mybookdb',
    },
}