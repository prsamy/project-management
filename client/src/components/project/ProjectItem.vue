<template>
  <div>
      <md-list-item>
            <md-card class="md-primary" md-theme="black-card">
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{project.name}}</div>
                  <div class="md-subhead">{{project.description}}</div>
                  <div class="md-subhead">{{project.date}}</div>
                  <!-- convert empid to emp name -->
                  <div v-for="employeeId in project.employees" :key="employeeId" class="md-subhead">{{employeeId}}</div>
                </md-card-header-text>
              </md-card-header>
              <md-card-actions>
                <md-button @click="$emit('edit', project)">Edit</md-button>
              </md-card-actions>
            </md-card>
        </md-list-item>
  </div>
</template>

<script>

export default {
  props: ['project'],
  emits: ['edit']
}
</script>

<style scoped>
  .md-card {
    width: 100%;
  }
</style>
