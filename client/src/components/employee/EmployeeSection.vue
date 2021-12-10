<template>
  <div>
    <EmployeeForm v-model="showDialogue" />

    <SectionTitle>Employees</SectionTitle>

    <md-list class="md-triple-line">
      <EmployeeItem
        v-for="emp in $store.state.employee.employees"
        :key="emp.id"
        :employee="emp" />
    </md-list>

    <md-button
      class="md-fab md-primary"
      @click="showDialogue = true">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import EmployeeItem from './EmployeeItem.vue'
import EmployeeForm from './EmployeeForm.vue'
import SectionTitle from '../misc/SectionTitle.vue'

export default {
  name: 'EmployeeSection',
  components: { EmployeeItem, EmployeeForm, SectionTitle },
  data () {
    return {
      showDialogue: false
    }
  },
  created () {
    this.$store.dispatch('fetchEmployees')
  }
}
</script>
