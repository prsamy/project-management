<template>
  <div>

    <ProjectForm
      v-model="showDialogue" />

    <SectionTitle>Projects</SectionTitle>

    <md-list
      class="md-triple-line">
      <ProjectItem
        v-for="project in $store.state.project.projects"
        :key="project.id"
        :project="project" />
    </md-list>
    <AddButton @openForm="(event) => showDialogue = event"/>
  </div>
</template>

<script>
import AddButton from '../misc/AddButton.vue'
import SectionTitle from '../misc/SectionTitle.vue'
import ProjectForm from './ProjectForm.vue'
import ProjectItem from './ProjectItem.vue'

export default {
  components: { ProjectItem, ProjectForm, SectionTitle, AddButton },
  name: 'ProjectSection',
  data () {
    return {
      showDialogue: false
    }
  },
  created () {
    this.$store.dispatch('fetchProjects')
  }
}
</script>
