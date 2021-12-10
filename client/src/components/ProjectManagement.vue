<template>
    <div id="project-management_header">
      <EmployeeSection class="project-management_element" />
      <ProjectSection class="project-management_element" />
      <SnackbarMessage />
    </div>
</template>

<script>
import EmployeeSection from './employee/EmployeeSection.vue'
import SnackbarMessage from './misc/SnackbarMessage.vue'
import ProjectSection from './project/ProjectSection.vue'
export default {
  components: { EmployeeSection, ProjectSection, SnackbarMessage }
}
</script>

<style scoped>

#project-management_header {
    display: grid;
    grid-template-columns: 40% 60%;
}

.project-management_element {
    margin: 10px;
}

</style>
