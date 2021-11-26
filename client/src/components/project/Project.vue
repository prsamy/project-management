<template>
  <div id='project'>
    <md-list v-for="project in projects" :key="project.id" class="md-triple-line">
      <project-item :project="project" />
    </md-list>
  </div>
</template>

<script>
import {projectService} from '../../service/project'
import ProjectItem from './ProjectItem.vue'

export default {
  components: { ProjectItem },
  name: 'Project',
  data () {
    return {
      projects: []
    }
  },
  async created () {
    const result = await projectService.getAll()
    if (result.status === 200) {
      this.projects = [...this.projects, ...result.data.projects]
      console.log(this.projects)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
