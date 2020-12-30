const http = require('../http')
const { Gamer, User, Traking, Statistic } = require('../db');

module.exports = {
  async firstTenByRankWithInf(req, res) {
    let playersUrls = []
    try {
      const resp = await http.get('/playersByRank')
      if (resp.data.length) {
        firstTen = resp.data.slice(0, 10)
        playersUrls = firstTen.map((pl) => `/players/${pl.account_id}`)
      }
    } catch (e) {
      console.log(e)
      return res.status(500).end()
    }

    try {
      let responses = await Promise.all(playersUrls.map((url) => http.get(url)))
      let respsData = responses.map(resp => resp.data)
  
      return res.send(respsData)
    } catch (e) {
      console.log(e)
    }

  },

  async trakingUsers(req, res) {
    let users = req.body.users
    let traking;

    for (user of users) {
      let findInTraking = await Traking.findOne({where: { account_id: user.account_id}})
      if (!findInTraking) {
        traking = await Traking.create({account_id: user.account_id})
        await req.user.addTraking(traking)
      }
    }
  },

  async getTraking(req, res) {
    userWithTrakings = await User.findOne({where: {id: req.user.id}, include: Traking })
    accounts = userWithTrakings.Trakings.map(el => el.account_id)
    let result = await Statistic.findAll({where: {account_id: accounts}, limit: accounts.length, order: [ [ 'createdAt', 'DESC' ]]})
    return res.send(result)
  },
  
  async deleteTrakingUser(req, res) {
    const {id} = req.params
    const gamer = await Gamer.findByPk(id)
    if (gamer) {
      const result = await gamer.destroy()
      return res.status(200).end()
    } 
    return res.status(401).end()
  },

  async statistic(req, res) {
    userWithTrakings = await User.findOne({where: {id: req.user.id}, include: Traking })
    accounts = userWithTrakings.Trakings.map(el => el.account_id)
    let result = await Statistic.findAll({where: {account_id: accounts}})
    return res.send(result)
  }
}
