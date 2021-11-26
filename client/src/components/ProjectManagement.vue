<template>
    <div id='project-management_header'>
        <employee id= 'project-management_employee' class='project-management_element' />
        <project id= 'project-management_project' class='project-management_element' />
    </div>
</template>

<script>
import Employee from './employee/Employee.vue'
import Project from './project/Project.vue'
export default {
  components: { Employee, Project },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

#project-management_header {
    display: flex;
}

#project-management_project {
    flex-grow: 3;
}

.project-management_element {
    margin: 10px;
    flex-grow: 2;
}

</style>
