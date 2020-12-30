<template>
  <div :class="['issues-link', {warn: calc()}]">
    <a :href="createUrl()" target="_blank" @click="issueClick(createUrl())" v-if="issues.length">{{
      issues.length
    }}</a>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    issues: {
      type: Array,
      required: true
    }
  },
  methods: {
    createUrl() {
      if (this.issues.length) {
        // let jql = `issuetype = ${typeName} AND status = ${this.issues[0].fields.status.name} AND priority = ${priorityName} AND assignee in (${this.issues[0].fields.assignee.accountId}) order by created DESC`;
        let issue = this.issues[0];
        let { status, assignee, priority, issuetype } = issue.fields;
        let accountId = assignee ? assignee.accountId : "EMPTY";
        let jql = `issuetype = ${issuetype.name} AND status = "${status.name}" AND priority = ${priority.name} AND assignee in (${accountId}) order by created DESC`;
        let url = `https://simple-crm-test.atlassian.net/issues/?jql=${jql}`;
        return url;
      }
    },
    calc() {
      if (this.issues.length) {
        let now = moment();
        let isFiveDaysOld = this.issues.some(el => {
          let days = moment
            .duration(now.diff(el.fields.created))
            .as("days");
          if (days > 5) {
            console.log(el.fields.created);
            return true;
          }
        });

        return isFiveDaysOld;
      }

      return;
    },
    issueClick(url) {
      this.$http.post('/api/log/userAction', {
        type: 'a',
        url
      })
    }
  }
};
</script>

<style scoped>
.issues-link {
  font-size: 12px;
  line-height: 12px;
  width: 100%;
  height: 100%;
}
.warn {
  background-color: yellow;
}
</style>
