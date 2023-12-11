const express = require('express')
const BookRouter = require('./BookRouter')

const router = express.Router()

router.use('/book', BookRouter)

module.exports = router