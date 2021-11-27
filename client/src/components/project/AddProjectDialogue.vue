<template>
  <div>
      <div class="overlay" v-if="value"></div>

      <div class="modal" v-if="value">
        <h3>{{formTitle}}</h3>

        <form @submit.prevent="addProject">
          <md-field :class="nameMessageClass">
            <label for="project_name">Project name</label>
            <md-input id="project_name" required v-model="name" maxlength="80"></md-input>
            <span class="md-error">{{this.nameErrorMessage}}</span>
          </md-field>

          <md-field :class="descriptionMessageClass">
            <label for="project_description">Description</label>
            <md-textarea id="project_description" required v-model="description" maxlength="300"></md-textarea>
            <span class="md-error">{{this.decriptionErrorMessage}}</span>
          </md-field>

          <md-field :class="dateMessageClass">
            <md-icon>event</md-icon>
            <label for="project_start_date">Start date</label>
            <md-input id="project_start_date" required v-model="date" placeholder="yyyy-mm-dd"></md-input>
            <span class="md-error">{{this.dateErrorMessage}}</span>
          </md-field>

          <assign-project-employee v-model="employees"/>

          <md-button class="md-raised" type="cancel" @click="$emit('input', false)">CANCEL</md-button>
          <md-button class="md-raised md-primary" :disabled="!validateForm" type="submit">SUBMIT</md-button>
        </form>
      </div>

      <md-snackbar md-position="left" :md-duration="snackbarDuration" :md-active.sync="showSnackbar" md-persistent>
        <span>{{snackbarMessage}}</span>
      </md-snackbar>
  </div>
</template>

<script>
import { projectService } from '../../service/project'
import AssignProjectEmployee from './AssignProjectEmployee.vue'
export default {
  name: 'AddProjectDialogue',
  components: { AssignProjectEmployee },
  props: ['value', 'editableProject'],
  data () {
    return {
      name: '',
      description: '',
      date: '',
      employees: [],
      showSnackbar: false,
      snackbarDuration: 5000,
      snackbarMessage: '',
      nameErrorMessage: '',
      decriptionErrorMessage: '',
      dateErrorMessage: '',
      formTitle: 'Add Project'
    }
  },
  computed: {
    nameMessageClass () {
      return {
        'md-invalid': this.name.length < 10 || !validateAlphanumeric(this.name)
      }
    },
    descriptionMessageClass () {
      return {
        'md-invalid': this.description.length < 50
      }
    },
    dateMessageClass () {
      return {
        'md-invalid': !validateDate(this.date)
      }
    },
    validateForm () {
      return this.name.length >= 10 && validateAlphanumeric(this.name)
    }
  },
  watch: {
    name () {
      if (this.name.length < 10 || !validateAlphanumeric(this.name)) {
        this.nameErrorMessage = 'The name should be in 10 to 80 letter alphanumeric'
      }
    },
    description () {
      if (this.description.length < 50) {
        this.decriptionErrorMessage = 'The description should be in 50 to 300 letter alphabet'
      }
    },
    date () {
      if (!validateDate(this.date)) {
        this.dateErrorMessage = 'The date should be in yyyy-mm-dd format'
      }
    },
    editableProject () {
      if (this.editableProject !== undefined && this.editableProject) {
        this.name = this.editableProject.name
        this.description = this.editableProject.description
        this.date = this.editableProject.date
        this.employees = this.editableProject.employees
        this.formTitle = 'Edit Project'
      }
    }
  },
  methods: {
    async addProject (values) {
      const obj = {name: this.name, description: this.description, date: this.date, employees: this.employees}
      const result = (this.editableProject !== undefined && this.editableProject) ? await projectService.update(this.editableProject.id, obj) : await projectService.add(obj)
      if (result.status === 200) {
        this.$emit('input', false)
        this.showSnackbar = true
        this.snackbarMessage = `Project ${this.name} is added/updated successfully`
      }
    }
  }
}

function validateAlphanumeric (text) {
  return new RegExp('^[a-z0-9 ]+$', 'i').test(text)
}

function validateDate (dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/
  if (!dateString.match(regEx)) return false
  var d = new Date(dateString)
  var dNum = d.getTime()
  if (!dNum && dNum !== 0) return false
  return d.toISOString().slice(0, 10) === dateString
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
