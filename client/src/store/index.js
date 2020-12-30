import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: {
      id: '',
      email: ''
    },
    token: ''
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload
    },
    login(state, payload) {
      localStorage.setItem('creds', JSON.stringify(payload))
      http.setBearer(payload.token)
      state.user = payload.user
      state.token = payload.token
    },
    logout(state, payload) {
      localStorage.removeItem('creds')
      http.setBearer('')
      state.user = {
        id: '',
        email: ''
      }
      state.token = ''
    }
  },
  actions: {},
  modules: {},
  getters: {
    isAuth(state) {
      return !!state.token
    }
  }
})
