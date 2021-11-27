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

    <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{snackbarMessage}}</span>
    </md-snackbar>

  </div>
</template>

<script>
import EmployeeItem from './EmployeeItem.vue'
import {employeeService} from '../../service/employee'
import AddEmployeeDialogue from './AddEmployeeDialogue.vue'

export default {
  name: 'Employee',
  components: { EmployeeItem, AddEmployeeDialogue },
  data () {
    return {
      showDialogue: false,
      showSnackbar: false,
      snackbarMessage: '',
      employees: []
    }
  },
  async created () {
    const result = await employeeService.getAll()
    if (result.status === 200) {
      this.employees = [...this.employees, ...result.data.employees]
    } else {
      this.snackbarMessage = result.data.message
      this.showSnackbar = true
    }
  }
}
</script>

<style>
</style>
