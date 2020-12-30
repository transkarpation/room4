const e = require('express')
const { Router } = require('express')
const dotaController = require('../controllers/dota.controller')

const r = Router()

r.get('/firstTenByRank', dotaController.firstTenByRankWithInf)
r.get('/trakingUsers', dotaController.getTraking)
r.post('/trakingUsers', dotaController.trakingUsers)
r.delete('/trakingUsers/:id', dotaController.deleteTrakingUser)
r.get('/statistic', dotaController.statistic)

module.exports = r
