<template>
  <div>
    <md-toolbar class="md-primary">
      <h3 class="md-title">Project Management</h3>
    </md-toolbar>
    <project-management />
  </div>
</template>

<script>
import ProjectManagement from './components/ProjectManagement.vue'

export default {
  components: { ProjectManagement },
  name: 'App'
}
</script>

<style >

</style>
