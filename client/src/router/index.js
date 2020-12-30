import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import TrakingList from '../views/TrakingList'
import Statistic from '../views/Statistic'
import store from '../store'

const ifAuthenticated = (to, from, next) => {
  if (store.getters['isAuth']) {
    next()
    return
  }

  next('/auth/')
}

let credsFromLocal = localStorage.getItem('creds')

if (credsFromLocal) {
  try {
    let creds = JSON.parse(credsFromLocal)
    store.commit('login', creds)
  } catch (e) {
    localStorage.removeItem('creds')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: '',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/traking-list',
    component: TrakingList,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/statistic',
    component: Statistic,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
