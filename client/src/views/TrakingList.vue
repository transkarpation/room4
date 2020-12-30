<template>
  <div>
    <div class="my-4">
      <h1 >Traking List</h1>
    </div>
    <div>
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
          <tr v-for="user of users" :key="user.account_id">
            <td>
              <b-button @click.prevent="() => onDelete(user)" size="sm" variant="danger" class="mb-2">
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
    <b-modal v-if="showModal" id="delete-user" v-model="showModal" title="Are you sure?">
      <p class="my-4">
        You are going to delete user with id <b>{{ userToDelete.account_id }}</b>
      </p>
      <template #modal-footer>
        <div>
          <b-button @click="showModal = false" class="mr-2">Cancel</b-button>
          <b-button @click="onDeleteConfirm" :disabled="disableActions" variant="danger">Delete</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      showConfirm: false,
      showModal: false,
      userToDelete: null,
      disableActions: false
    }
  },
  async created() {
    let response = await this.$http.get('/dota/trakingUsers')
    this.users = response.data
  },
  methods: {
    onDelete(user) {
      this.showModal = true
      this.userToDelete = user
    },
    async onDeleteConfirm() {
      try {
        this.disableActions = true
        const result = await this.$http.delete(`/dota/trakingUsers/${this.userToDelete.id}`)
        const index = this.users.findIndex(el => el.id = this.userToDelete.id)
        this.users.splice(index, 1)
        console.log(result)
      } catch (e) {
          // this.$notify({

          // })
      }
      this.disableActions = false
      this.showModal = false

    }
  }
}
</script>
