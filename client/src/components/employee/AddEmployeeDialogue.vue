<template>
  <div>
      <div class="overlay" v-if="value"></div>

      <div class="modal" v-if="value">
        <h3>Add Employee</h3>

        <form @submit.prevent="addEmployee">
          <md-field :class="idMessageClass">
            <label for="employee_id">ID</label>
            <md-input id="employee_id" required v-model="id" maxlength="6"></md-input>
            <span class="md-error">{{this.idErrorMessage}}</span>
          </md-field>

          <md-field :class="nameMessageClass">
            <label for="employee_name">Full ame</label>
            <md-input id="employee_name" required v-model="name" maxlength="50"></md-input>
            <span class="md-error">{{this.nameErrorMessage}}</span>
          </md-field>

          <md-button class="md-raised" type="cancel" @click="$emit('input', false)">CANCEL</md-button>
          <md-button class="md-raised md-primary" :disabled="!formValidated" type="submit">SUBMIT</md-button>
        </form>
      </div>

      <md-snackbar md-position="left" :md-duration="snackbarDuration" :md-active.sync="showSnackbar" md-persistent>
        <span>{{snackbarMessage}}</span>
      </md-snackbar>
  </div>
</template>

<script>
import { employeeService } from '../../service/employee'
export default {
  props: ['value'],
  data () {
    return {
      showSnackbar: false,
      snackbarDuration: 5000,
      snackbarMessage: '',
      id: '',
      name: '',
      idErrorMessage: '',
      nameErrorMessage: ''
    }
  },
  computed: {
    idMessageClass () {
      return {
        'md-invalid': this.id.length < 6 || !validateAlphanumeric(this.id)
      }
    },
    nameMessageClass () {
      return {
        'md-invalid': this.name.length < 3 || !validateAlphabet(this.name)
      }
    },
    formValidated () {
      return (this.id.length === 6 && this.name.length >= 3) && validateAlphanumeric(this.id) && validateAlphabet(this.name)
    }
  },
  watch: {
    id () {
      if (this.id.length < 6 || !validateAlphanumeric(this.id)) {
        this.idErrorMessage = 'The id should be in 6 letters alphanumeric'
      }
    },
    name () {
      if (this.name.length < 3 || !validateAlphabet(this.name)) {
        this.nameErrorMessage = 'The name should be in 3 to 50 letter alphabet'
      }
    }
  },
  methods: {
    async addEmployee () {
      const result = await employeeService.addEmployee({id: this.id, name: this.name})
      if (result.status === 200) {
        this.$emit('input', false)
        this.showSnackbar = true
        this.snackbarMessage = `Employee ${this.name} is added successfully`
      }
    }
  }
}

function validateAlphanumeric (text) {
  return new RegExp('^[a-z0-9]+$', 'i').test(text)
}

function validateAlphabet (text) {
  return new RegExp('^[a-z ]+$', 'i').test(text)
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
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
