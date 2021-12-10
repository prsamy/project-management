<template>
  <div>
      <div
        class="overlay"
        v-if="showModal">
      </div>

      <div
        class="modal"
        v-if="showModal">
      <h3>Add Employee</h3>

        <form
          @submit.prevent="addEmployee">
          <md-field
            :class="idMessageClass">
            <label for="employee_id">ID</label>
            <md-input
              id="employee_id"
              maxlength="6"
              required
              v-model="id" />
            <span class="md-error">{{this.idErrorMessage}}</span>
          </md-field>

          <md-field :class="nameMessageClass">
            <label for="employee_name">Full name</label>
            <md-input
              id="employee_name"
              maxlength="50"
              required
              v-model="name" />
            <span class="md-error">{{this.nameErrorMessage}}</span>
          </md-field>

          <md-button
            class="md-raised"
            type="cancel"
            @click="$emit('input', false)">CANCEL
          </md-button>
          <md-button
            class="md-raised md-primary"
            type="submit"
            :disabled="!isFormValid">SUBMIT
          </md-button>
        </form>
      </div>

      <!-- <md-snackbar
        md-position="left"
        md-persistent
        :md-duration="snackbarDuration"
        :md-active.sync="showSnackbar">
        <span>{{snackbarMessage}}</span>
      </md-snackbar> -->
  </div>
</template>

<script>

import validation from '../../service/form-validation'

export default {
  name: 'EmployeeForm',
  props: ['value'],
  emits: ['input'],
  data () {
    return {
      showSnackbar: false,
      // snackbarDuration: 5000,
      // snackbarMessage: '',
      id: '',
      name: '',
      idErrorMessage: '',
      nameErrorMessage: ''
    }
  },
  computed: {
    showModal () {
      return this.value
    },
    idMessageClass () {
      return {
        'md-invalid': this.id.length < 6 || !validation.validateAlphanumeric(this.id)
      }
    },
    nameMessageClass () {
      return {
        'md-invalid': this.name.length < 3 || !validation.validateAlphabet(this.name)
      }
    },
    isFormValid () {
      return (this.id.length === 6 && this.name.length >= 3) && validation.validateAlphanumeric(this.id) && validation.validateAlphabet(this.name)
    }
  },
  watch: {
    id () {
      if (this.id.length < 6 || !validation.validateAlphanumeric(this.id)) {
        this.idErrorMessage = 'The id should be in 6 letters alphanumeric'
      }
    },
    name () {
      if (this.name.length < 3 || !validation.validateAlphabet(this.name)) {
        this.nameErrorMessage = 'The name should be in alphabet between 3 and 50 characters'
      }
    }
  },
  methods: {
    addEmployee () {
      this.$store.dispatch('pushEmployee', {employee: {id: this.id, name: this.name}})
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
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
