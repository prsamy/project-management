<template>
  <div>
      <md-list-item>
            <md-card class="md-primary" md-theme="black-card">
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{project.name}}</div>
                  <div class="md-subhead">{{project.description}}</div>
                  <div class="md-subhead">{{project.date}}</div>
                  <div v-for="employee in project.employees" :key="employee.id" class="md-subhead">{{employee.name}}</div>
                </md-card-header-text>
              </md-card-header>
            </md-card>
        </md-list-item>
  </div>
</template>

<script>

export default {
  props: ['project'],
  created () {
  }
}
</script>

<style scoped>
  .md-card {
    width: 100%;
  }
</style>
