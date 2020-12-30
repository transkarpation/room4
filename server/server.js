require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const authenticateJwt = require('./middlewares/jwt.mw')
const { routesWhiteList } = require('./config/jwt.config')
const {
  app: { port: APP_PORT }
} = require('./config')
const { sequelize } = require('./db')
const passport = require('./config/passport.config')
const routes = require('./routes')

const app = express()

sequelize
  .authenticate()
  .then(async () => {
    // sequelize.sync({ force: true });
    sequelize.sync({ alter: true });

    sequelize.sync()

    app.use(cors())
    app.use(express.json())
    passport.initialize()

    app.use(morgan('tiny'))
    app.use('/api', authenticateJwt(routesWhiteList), routes)

    app.listen(APP_PORT, () => {
      console.log(`Listening on ${APP_PORT}`)
    })
  })
  .catch((e) => {
    console.log('!!!!!!!!!!!!!!!!!!')
    console.log(e)
  })
