<template>
  <div id="project_employees" class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label for="employees">Employees</label>
        <md-select v-model="assignedEmployees" name="employees" id="employees" multiple>
          <md-option v-for="employee in employees" :key="employee.id" :value="employee.id">{{employee.name}}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
import { employeeService } from '../../service/employee'
export default {
  props: ['value'],
  emits: ['input'],
  data () {
    return {
      employees: [],
      assignedEmployees: []
    }
  },
  watch: {
    assignedEmployees () {
      this.$emit('input', this.assignedEmployees)
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
  #project_employees {
      max-width: 300px;
  }
  .md-menu-content.md-select-menu {
      z-index: 9999 !important;
  }
</style>
