<template>
  <div id='project'>

    <add-project-dialogue :editableProject="editableProject" v-model="showDialogue"></add-project-dialogue>

    <md-toolbar class="md-accent" :md-elevation="1">
      <span class="md-title">Projects</span>
    </md-toolbar>

    <md-list v-for="project in projects" :key="project.id" class="md-triple-line">
      <project-item :project="project" :key="project.id" @edit="editProject" />
    </md-list>

    <md-button @click="showDialogue = true" class="md-fab md-primary">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import {projectService} from '../../service/project'
import AddProjectDialogue from './AddProjectDialogue.vue'
import ProjectItem from './ProjectItem.vue'

export default {
  components: { ProjectItem, AddProjectDialogue },
  name: 'Project',
  data () {
    return {
      showDialogue: false,
      projects: [],
      editableProject: undefined
    }
  },
  methods: {
    editProject (event) {
      this.editableProject = event
      this.showDialogue = true
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
