import Vue from 'vue'
import Vuex from 'vuex'

import employee from './modules/employee'
import project from './modules/project'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employee,
    project
  },
  state: {
    showSnackbar: false,
    snackbarMessage: ''
  },
  mutations: {
    displaySnackbarMessage (state, message) {
      state.snackbarMessage = message
      state.showSnackbar = true
    },
    closeSnackbarMessage (state) {
      state.showSnackbar = false
    }
  }
})
