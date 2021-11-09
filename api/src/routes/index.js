const { CalculatorController } = require('../controllers')

const router = require('express').Router()

router.post('/calc', CalculatorController.post)

module.exports = router