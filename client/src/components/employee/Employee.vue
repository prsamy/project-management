<template>
  <div id='employee'>
    <add-employee-dialog v-model="showDialogue"></add-employee-dialog>

    <md-list v-for="emp in employees" :key="emp.id" class="md-triple-line">
      <employee-item :employee="emp" />
      <md-divider class="md-inset"></md-divider>
    </md-list>

    <md-button @click="showDialogue = true" class="md-fab md-primary">
      <md-icon>add</md-icon>
    </md-button>

  </div>
</template>

<script>
import EmployeeItem from './EmployeeItem.vue'
import {employeeService} from '../../service/employee'
import AddEmployeeDialog from './AddEmployeeDialog.vue'

export default {
  components: { EmployeeItem, AddEmployeeDialog },
  data () {
    return {
      showDialogue: false,
      employees: []
    }
  },
  async created () {
    const result = await employeeService.getAll()
    if (result.status === 200) {
      this.employees = [...this.employees, ...result.data.employees]
    }
  }
}
</script>

<style>
</style>
