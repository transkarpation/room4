<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link :to="{path: '/'}" class="navbar-brand" href="#">Room4</router-link>
    <button
      class="navbar-toggler"
      @click.prevent="show = !show"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="['collapse', 'navbar-collapse', {'show': show}]" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{path: '/traking-list'}">Traking List</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{path: '/statistic'}">Statistic</router-link>
        </li>
      </ul>
      <div class="d-flex align-items-center">
        <div class="mr-4">{{ email }}</div>
        <button @click.prevent="onLogout" class="btn btn-outline-primary my-2 my-sm-0">Logout</button>
      </div>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form> -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
      show: false
    }
  },
  methods: {
    async onLogout() {
      try {
        let resp = await this.$http.post('/auth/logout')
        this.$store.commit('logout')
        this.$router.push({path: '/auth'})
      } catch (e) {

      }
    }
  },
  computed: {
    email() {
      return this.$store.state.user.email
    }
  }
}
</script>
