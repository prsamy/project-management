<template>
  <h4>{{employees}}</h4>
</template>

<script>
import { employeeService } from '../../service/employee'
export default {
  name: 'ProjectEmployeeNames',
  props: ['id'],
  data () {
    return {
      employees: []
    }
  },
  async created () {
    const result = await employeeService.get(this.id)
    if (result.status === 200 && result.data) {
      this.employees = result.data.name
    }
  }

}
</script>

<style scoped>
    h4 {
        margin-right: 5px ;
    }
</style>
