<template>
  <div id='employee'>
    <add-employee-dialogue v-model="showDialogue"></add-employee-dialogue>

    <md-toolbar class="md-accent" :md-elevation="1">
      <span class="md-title">Employees</span>
    </md-toolbar>

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
import AddEmployeeDialogue from './AddEmployeeDialogue.vue'

export default {
  components: { EmployeeItem, AddEmployeeDialogue },
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
