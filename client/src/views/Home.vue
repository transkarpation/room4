<template>
  <div class="home">
    <div class="my-4">
      <h1 v-if="!selectedUsers.length">Select users for traking</h1>
      <div v-else>
        <button v-b-modal.modal-1>Sart traking {{ selectedUsers.length }} users</button>
      </div>

    </div>
    <table class="table table-hover table-responsive-md">
      <thead>
        <tr>
          <th></th>
          <th>account_id</th>
          <th>avatarmedium</th>
          <th>personaname</th>
          <th>solo_competitive_rank</th>
          <th>rank_tier</th>
          <th>mmr_estimate</th>
        </tr>
      </thead>
      <tbody v-if="users.length">
        <tr v-for="user of users" :key="user.profile.account_id" @click.prevent="() => setSelected(user)">
          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :checked="isSelected(user)">
            </div>
          </td>
          <td>
            {{ user.profile.account_id }}
          </td>
          <td>
            <img :src="user.profile.avatarmedium" alt="">
          </td>
          <td>
            {{ user.profile.personaname }}
          </td>
          <td>
            {{user.solo_competitive_rank}}
          </td>
          <td>
            {{ user.rank_tier }}
          </td>
          <td>{{ user.mmr_estimate.estimate }}</td>
        </tr>
      </tbody>
    </table>
    <b-modal @ok="onSave" id="modal-1" title="Start traking">
      <p class="my-4">
        You are going to start traking folowing users:
        <ul>
          <li v-for="user of selectedUsers" :key="user.profile.account_id">{{user.profile.account_id}}  {{user.profile.personaname}}</li>
        </ul>
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      users: [],
      selectedUsers: []
    }
  },
  async created() {
    this.$store.commit('setLoading', true)
    const resp = await this.$http.get('/dota/firstTenByRank')
    this.$store.commit('setLoading', false)
    this.users = resp.data
  },
  methods: {
    setSelected(user) {
      const index = this.selectedUsers.findIndex(el => el.profile.account_id === user.profile.account_id)
      console.log('selected index ', index)
      if (index > -1) {
        this.selectedUsers.splice(index, 1)
        console.log(this.selectedUsers.length)
        return
      }
      console.log('pushing user ')
      this.selectedUsers.push(user)
      console.log(this.selectedUsers.length)
      
    },
    isSelected(user) {
      return this.selectedUsers.findIndex(el => el.profile.account_id === user.profile.account_id) > -1 ? true : false
    },
    async onSave() {
      let users = this.selectedUsers.map(el => ({
        account_id: el.profile.account_id,
        competitive_rank: el.competitive_rank,
        leaderboard_rank: el.leaderboard_rank,
        mmr_estimate: el.mmr_estimate.estimate,
        avatarmedium:  el.profile.avatarmedium,
        cheese:  el.profile.cheese,
        is_contributor:  el.profile.is_contributor,
        last_login:  el.profile.last_login,
        personaname:  el.profile.personaname,
        rank_tier:  el.rank_tier
      }))
      let resp = await this.$http.post('/dota/trakingUsers', {users})
    }
  }
}
</script>
