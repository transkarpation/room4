<template>
  <div class="issues-cell">
    <div class="row" v-for="(type, index) in issuetype" :key="index">
      <div class="cell" v-for="(p, indx) in priority" :key="indx">
        <issues-link :issues="getIssuesByTypeAndPriority(type.name, p.name)" />
      </div>
    </div>
  </div>
</template>

<script>
import IssuesLink from '../components/IssuesLink'
export default {
  props: {
    issues: {
      type: Array,
      default: () => [],
    },
    priority: {
      type: Array,
      default: () => [],
    },
    issuetype: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    IssuesLink
  },
  methods: {
    // issuetype = Task AND status = Backlog AND priority = Medium AND assignee in (5fc90f65aa1d30006f6ab924) order by created DESC
    getIssuesByTypeAndPriority(typeName, priorityName) {
      return this.issues.filter((item) => {
        return (
          item.fields.issuetype.name === typeName &&
          item.fields.priority.name === priorityName
        );
      });
    },
    makeJql(typeName, priorityName) {
      if(this.issues.length) {
        let jql = `issuetype = ${typeName} AND status = ${this.issues[0].fields.status.name} AND priority = ${priorityName} AND assignee in (${this.issues[0].fields.assignee.accountId}) order by created DESC`;
        return jql;
      }
      return;
    },
  },
};
</script>

<style scoped>
.issues-cell {
  display: inline-block;
}

.row {
  display: flex;
}

.cell {
  width: 15px;
  height: 15px;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>