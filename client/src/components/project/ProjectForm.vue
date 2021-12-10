<template>
  <div v-if="value">
      <div class="overlay"></div>
      <div class="modal">
        <h3>{{formTitle}}</h3>

        <form @submit.prevent="submitProject">
          <md-field :class="nameMessageClass">
            <label for="project_name">Project name</label>
            <md-input
              required
              id="project_name"
              maxlength="80"
              v-model="name"></md-input>
            <span class="md-error">{{this.nameErrorMessage}}</span>
          </md-field>

          <md-field :class="descriptionMessageClass">
            <label for="project_description">Description</label>
            <md-textarea
              required
              id="project_description"
              maxlength="300"
              v-model="description"></md-textarea>
            <span class="md-error">{{this.decriptionErrorMessage}}</span>
          </md-field>

          <md-field :class="dateMessageClass">
            <md-icon>event</md-icon>
            <label for="project_start_date">Start date</label>
            <md-input
              required
              id="project_start_date"
              placeholder="yyyy-mm-dd"
              v-model="date" />
            <span class="md-error">{{this.dateErrorMessage}}</span>
          </md-field>

          <ProjectAssignEmployee v-model="employees" />

          <md-button
            class="md-raised"
            type="cancel"
            @click.prevent="$emit('input', false)">
            CANCEL
          </md-button>
          <md-button
            class="md-raised md-primary"
            type="submit"
            :disabled="!validateForm">
            SUBMIT
          </md-button>
        </form>
      </div>

      <!-- <md-snackbar
        md-position="left"
        :md-active.sync="showSnackbar"
        :md-duration="snackbarDuration"
        md-persistent>
        <span>{{snackbarMessage}}</span>
      </md-snackbar> -->
  </div>
</template>

<script>
import validation from '../../service/form-validation'
import ProjectAssignEmployee from './ProjectAssignEmployee.vue'

export default {
  name: 'ProjectForm',
  components: { ProjectAssignEmployee },
  props: ['value', 'editableProject'],
  data () {
    return {
      name: '',
      description: '',
      date: '',
      employees: [],
      showSnackbar: false,
      // snackbarDuration: 5000,
      // snackbarMessage: '',
      nameErrorMessage: '',
      decriptionErrorMessage: '',
      dateErrorMessage: '',
      formTitle: 'Add Project'
    }
  },
  computed: {
    nameMessageClass () {
      return {
        'md-invalid': this.name.length < 10 || !validation.validateAlphanumeric(this.name)
      }
    },
    descriptionMessageClass () {
      return {
        'md-invalid': this.description.length < 50
      }
    },
    dateMessageClass () {
      return {
        'md-invalid': !validation.validateDate(this.date)
      }
    },
    validateForm () {
      return this.name.length >= 10 && validation.validateAlphanumeric(this.name)
    }
  },
  watch: {
    name () {
      if ((this.name && this.name.length < 10) || !validation.validateAlphanumeric(this.name)) {
        this.nameErrorMessage = 'The name should be in 10 to 80 letters alphanumeric'
      }
    },
    description () {
      if (this.description && this.description.length < 50) {
        this.decriptionErrorMessage = 'The description should be in 50 to 300 letters alphabet'
      }
    },
    date () {
      if (!validation.validateDate(this.date)) {
        this.dateErrorMessage = 'The date should be in yyyy-mm-dd format'
      }
    },
    editableProject () {
      if (this.editableProject) {
        this.name = this.editableProject.name
        this.description = this.editableProject.description
        this.date = this.editableProject.date
        this.employees = this.editableProject.employees
        this.formTitle = 'Edit Project'
      }
    }
  },
  methods: {
    async submitProject () {
      const project = {name: this.name, description: this.description, date: this.date, employees: this.employees}
      if (!this.editableProject) {
        this.$store.dispatch('pushProject', {project})
      } else {
        this.$store.dispatch('editProject', {id: this.editableProject.id, project})
      }
      this.$emit('input', false)
    }
  }
}
</script>

<style>
  .modal {
    position: fixed;
    top: 20%;
    left: 30%;
    width: 40%;
    z-index: 9999;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
  }

  .overlay {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
