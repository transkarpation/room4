const { Router } = require('express');
const loginMw = require('../middlewares/login.mw')
const registerMw = require('../middlewares/register.mw')
const authController = require('../controllers/auth.controller')

const r = Router();

r.post('/register', registerMw, authController.sendUser);

r.post('/login', loginMw, authController.sendUser);

r.post('/logout', (req, res) => {
  res.status(200).end();
})

module.exports = r;
