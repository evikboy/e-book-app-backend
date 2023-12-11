const conf = require('./config')
const log_level = conf.log_level

const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')


const app = express()

app.use(morgan(log_level))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/', routes)

module.exports = app