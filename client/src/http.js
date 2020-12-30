import axios from 'axios'
console.log(process.env.VUE_APP_URL)

const http = axios.create({
  baseURL: process.env.VUE_APP_URL
})

http.setBearer = function (token) {
  this.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default http;