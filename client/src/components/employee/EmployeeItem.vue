<template>
  <div>
    <md-list-item>
      <div class="md-list-item-text">
        <div class="md-title">{{employee.name}}</div>
        <div>{{employee.id}}</div>
      </div>
    </md-list-item>
    <md-divider class="md-inset"></md-divider>
  </div>
</template>

<script>
export default {
  name: 'EmployeeItem',
  props: {
    employee: {
      type: Object,
      required: true
    }
  }
}
</script>
