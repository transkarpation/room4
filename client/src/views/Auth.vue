<template>
  <div class="auth">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style scoped>
  .auth {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>