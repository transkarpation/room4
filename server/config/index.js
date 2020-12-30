const APP_PORT = 3333

module.exports = {
  app: {
    port: process.env.APP_PORT || APP_PORT
  },
  db: {
    dialect: process.env.DB_DIALECT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING
  },
  jira: {
    baseurl: process.env.JIRA_BASEURL,
    email: process.env.JIRA_EMAIL,
    token: process.env.JIRA_TOKEN
  },
  dota: {
    baseurl: process.env.DOTA_BASEURL
  }
}