<template>
  <div class="container" id="app">
    <TopNav v-if="isAuth" />
    <router-view />
    <Loader :is-loading="isLoading" />
    <notifications group="main" />
  </div>
</template>

<script>
import Loader from './components/Loader'
import TopNav from './components/TopNav'

export default {
  name: 'App',
  components: {
    Loader,
    TopNav
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    isAuth() {
      return !!this.$store.state.token
    }
  }
}
</script>

<style>
  #app {
    min-height: 100%;
    overflow-x: auto;
  }
</style>