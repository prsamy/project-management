<template>
  <div
    id="project_employees"
    class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label for="employees">Employees</label>
        <md-select
          multiple
          v-model="assignedEmployees"
          name="employees"
          id="employees">
          <md-option
            v-for="employee in $store.state.employee.employees"
            :key="employee.id"
            :value="employee.id">
            {{employee.name}}
          </md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectAssignEmployee',
  props: ['value'],
  emits: ['input'],
  data () {
    return {
      assignedEmployees: []
    }
  },
  watch: {
    assignedEmployees () {
      this.$emit('input', this.assignedEmployees)
    }
  },
  created () {
    this.assignedEmployees = this.value
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
