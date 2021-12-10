<template>
  <h4>{{employee}}</h4>
</template>

<script>
export default {
  name: 'ProjectEmployeeNames',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      employee: ''
    }
  },
  created () {
    this.employee = this.$store.getters.getEmployeeName(this.id)
  }

}
</script>

<style scoped>
    h4 {
        margin-right: 5px ;
    }
</style>
