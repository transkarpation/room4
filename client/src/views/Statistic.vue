<template>
  <div>
    <div>
      Statistic Page
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Actions</th>
          <th>account_id</th>
          <th>avatarmedium</th>
          <th>personaname</th>
          <th>competitive_rank</th>
          <th>rank_tier</th>
          <th>mmr_estimate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users" :key="user.id">
          <td>
            <b-button
              @click.prevent="() => onDelete(user)"
              size="sm"
              variant="danger"
              class="mb-2"
            >
              <b-icon icon="trash" aria-label="Help"></b-icon>
            </b-button>
          </td>
          <td>{{ user.account_id }}</td>
          <td>
            <img :src="user.avatarmedium" alt="" />
          </td>
          <td>{{ user.personaname }}</td>
          <td>{{ user.competitive_rank }}</td>
          <td>{{ user.rank_tier }}</td>
          <td>{{ user.mmr_estimate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    let response = await this.$http.get('/dota/statistic')
    this.users = response.data
  }
}
</script>
