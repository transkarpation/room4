<template>
  <div class="home">
    <h1>Home</h1>
    <div class="d-flex mb-4">
      <v-select
        v-model="selectedFilter"
        class="select-filter"
        :options="jira.filter"
        label="name"
        placeholder="'Selet Filter'"
      />
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th colspan="2"></th>
              <th
                class="board-name"
                v-for="(board, index) in jira.boardColumns"
                :key="index"
              >
                {{ board.name }}
              </th>
            </tr>
            <tr>
              <th>
                Assignee
              </th>
              <th>
                Type
              </th>
              <th
                class="priorities center-align"
                v-for="(board, index) in jira.boardColumns"
                :key="index"
              >
                <img
                  v-for="prior in jira.priority"
                  :key="prior.id"
                  :src="prior.iconUrl"
                  alt=""
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in jira.users" :key="user.accountId">
              <td>{{ user.displayName }}</td>
              <td>
                <div class="issuetypes">
                  <img
                    :src="type.iconUrl"
                    v-for="type in jira.issuetype"
                    :key="type.id"
                    alt=""
                  />
                </div>
              </td>
              <td
                v-for="(board, index) in jira.boardColumns"
                :key="index"
                class="center-align"
              >
                <!-- <issues-cell :issues="jira.issuesByUsers[user.accountId][board.name]" :priority="jira.priority" :issuetype="jira.issuetype" /> -->
                <issues-cell
                  class="center-align"
                  :issues="getIssuesForCell(user.accountId, board.name)"
                  :priority="jira.priority"
                  :issuetype="jira.issuetype"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import IssuesCell from '../components/IssuesCell'

export default {
  name: 'Home',
  components: {
    IssuesCell
  },
  data() {
    return {
      jira: {
        boardColumns: [],
        boards: [],
        filter: [],
        issues: [],
        issuetype: [],
        users: [],
        priority: [],
        issuesByUsers: []
      },
      selectedFilter: null
    }
  },
  async created() {
    this.$store.commit('setLoading', true)
    let resp = await this.$http.get('/jira/getData')
    this.jira = {
      ...resp.data
    }
    if (!this.selectedFilter) {
      this.selectedFilter = this.jira.filter[0]
    }
    this.$store.commit('setLoading', false)
    // this.projects = resp.data.values
  },
  methods: {
    async changeFilter(filter) {
      this.$nuxt.$loading.start()
      const resp = await this.$http.$get(`/api/jira/getData?jql=${filter.jql}`)
      this.$nuxt.$loading.finish()
      this.jira = {
        ...resp
      }
    },
    getIssuesForCell(accountId, boardName) {
      if (this.jira.issuesByUsers[accountId]) {
        return this.jira.issuesByUsers[accountId][boardName]
      }
      return []
    }
  },
  watch: {
    selectedFilter(val) {
      console.log('selectedFilter change ', val)
    }
  }
}
</script>

<style scoped>
.select-filter {
  width: 300px;
}

.priorities img {
  width: 15px;
}

.issuetypes {
  display: flex;
  flex-direction: column;
}

.board-name {
  max-width: 100px;
  text-align: center;
}

.center-align {
  text-align: center;
  vertical-align: middle;
}
</style>
