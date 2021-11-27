<template>
  <h4>{{employee}}</h4>
</template>

<script>
import { employeeService } from '../../service/employee'
export default {
  name: 'ProjectEmployeeNames',
  props: ['id'],
  data () {
    return {
      employee: ''
    }
  },
  async created () {
    const result = await employeeService.get(this.id)
    console.log('Employee: ', result.data)
    if (result.status === 200 && result.data) {
      this.employee = result.data.name
    }
  }

}
</script>

<style scoped>
    h4 {
        margin-right: 5px ;
    }
</style>
