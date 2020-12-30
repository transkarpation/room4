<template>
  <div>
    <div>{{ title }}</div>
    <select>
      <option v-for="(option, index) of options" :key="index">
        {{ option.name }}
      </option>
    </select>
  </div>

</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>