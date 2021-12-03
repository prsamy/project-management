<template>
  <div>
      <md-list-item>
            <md-card class="md-primary" md-theme="black-card">
              <md-card-header>
                <md-card-header-text>
                  <h4 class="project--title md-title">{{project.name}}</h4>
                  <span class="project--start_date md-subhead"><i>Start date:</i> {{project.date}}</span>
                  <div class="md-subhead">{{project.description}}</div>
                  <h4 class="project__assigned-label--header">Assigned: </h4>
                  <div v-for="employeeId in project.employees" :key="employeeId" class="project--employee-names-parent md-subhead">
                    <project-employee-names :id="employeeId" />
                  </div>
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
  emits: ['edit'],
  data () {
    return {
      employees: []
    }
  },
  components: {
    ProjectEmployeeNames: () => import('./ProjectEmployeeNames.vue')
  }
}
</script>

<style scoped>
  .md-card {
    width: 100%;
  }
  .project--title {
    display: inline-block;
  }
  .project--start_date {
    position: absolute;
    right: 10%;
  }
  .project--employee-names-parent, .project__assigned-label--header {
    display: inline-block;
  }
</style>
