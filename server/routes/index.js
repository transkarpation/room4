const { Router } = require('express')
const authRouter = require('./auth')
const dotaR = require('./dota.js')

const r = Router()

r.use('/auth', authRouter)
r.use('/dota', dotaR)

module.exports = r
