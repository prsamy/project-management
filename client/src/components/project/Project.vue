<template>
  <div id='project'>

    <project-form :editableProject="editableProject" v-model="showDialogue"></project-form>

    <md-toolbar class="md-accent" :md-elevation="1">
      <span class="md-title">Projects</span>
    </md-toolbar>

    <md-list v-for="project in projects" :key="project.id" class="md-triple-line">
      <project-item :project="project" :key="project.id" @edit="editProject" />
    </md-list>

    <md-button @click="showDialogue = true" class="md-fab md-primary">
      <md-icon>add</md-icon>
    </md-button>

    <md-snackbar md-position="center" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{snackbarMessage}}</span>
    </md-snackbar>
  </div>
</template>

<script>
import { projectService } from '../../service/project'
import ProjectForm from './ProjectForm.vue'
import ProjectItem from './ProjectItem.vue'

export default {
  components: { ProjectItem, ProjectForm },
  name: 'Project',
  data () {
    return {
      showDialogue: false,
      showSnackbar: false,
      snackbarMessage: '',
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
    } else {
      this.snackbarMessage = result.data.message
      this.showSnackbar = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
