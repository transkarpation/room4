const express = require('express')
require('dotenv').config({path: '../.env'})
const http = require('../http')
const CronJob = require('cron').CronJob
const {db: dbConfig} = require('../config')

// const knex = require('knex')({
//   client: 'myslq',
//   connection: {
//     filename: "../database.sqlite"
//   }
// });

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : dbConfig.host,
    user : dbConfig.username,
    password : dbConfig.password,
    database : dbConfig.name
  }
});

async function jobHandler() {
  const accounts = await knex.select('account_id', 'id').from('Trakings')
  console.log(accounts)
  if (accounts.length) {
    let urls = accounts.map(acc => {
      return `/players/${acc.account_id}`
    })
    // result.data: {
    //   tracked_until: null,
    //   solo_competitive_rank: 8014,
    //   profile: {
    //     account_id: 56351509,
    //     personaname: 'sierra',
    //     name: 'DM',
    //     plus: true,
    //     cheese: 0,
    //     steamid: '76561198016617237',
    //     avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8e/8e58bae8dada8e1cc629b0c013a5c09752bcd9e7.jpg',
    //     avatarmedium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8e/8e58bae8dada8e1cc629b0c013a5c09752bcd9e7_medium.jpg',
    //     avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8e/8e58bae8dada8e1cc629b0c013a5c09752bcd9e7_full.jpg',
    //     profileurl: 'https://steamcommunity.com/id/youaredead2me/',
    //     last_login: '2019-01-28T13:51:11.937Z',
    //     loccountrycode: 'SG',
    //     is_contributor: false
    //   },
    //   mmr_estimate: { estimate: 7674 },
    //   rank_tier: 80,
    //   competitive_rank: 6617,
    //   leaderboard_rank: 24
    // }


    Promise.all(urls.map(url => http.get(url)))
      .then(async (results) => {
        for (result of results) {
          const traking = accounts.find(acc => acc.account_id == result.data.profile.account_id)

          await knex('Statistics').insert({
            account_id: result.data.profile.account_id,
            personaname: result.data.profile.personaname,
            solo_competitive_rank: result.data.solo_competitive_rank,
            estimate: result.data.mmr_estimate.estimate,
            rank_tier: result.data.rank_tier,
            competitive_rank: result.data.competitive_rank,
            leaderboard_rank: result.data.leaderboard_rank,
            trakingId: traking.id,
            createdAt: knex.fn.now(),
            updatedAt: knex.fn.now()
          })
        }
      })
      .catch(e => console.log(e))
  }
}

jobHandler()
const job = new CronJob('0 */1 * * * *', jobHandler);

job.start();

const app = express()

app.get('/', (req, res) => {
  res.send('statistic')
})

app.listen(4545, () => console.log('listening 4545 ', process.env.DOTA_BASEURL));