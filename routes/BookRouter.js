const express = require('express')
const router = express.Router()
const { BookController } = require('../controllers')

router.post('/', BookController.create)
router.delete('/:id', BookController.remove)
router.patch('/:id', BookController.update)
router.get('/', BookController.getAll)

module.exports = router

