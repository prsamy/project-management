import Api from '../../service/Api'

export default {
  namespace: true,
  state: {
    employees: []
  },
  mutations: {
    listEmployees (state, employees) {
      state.employees = employees
    },
    addEmployee (state, employee) {
      state.employees = [...state.employees, employee]
    }
  },
  getters: {
    getEmployeeName: (state) => (id) => {
      const employee = state.employees.find(emp => emp.id === id)
      return employee ? employee.name : ''
    }
  },
  actions: {
    async pushEmployee ({commit}, payload) {
      try {
        const res = await Api.post('/employee', payload.employee)
        if (res.status === 200) {
          commit('addEmployee', payload.employee)
          commit('displaySnackbarMessage', res.data.message, {root: true})
        }
      } catch (error) {
        commit('displaySnackbarMessage', error.response.data.message, {root: true})
      }
    },
    async fetchEmployees ({commit}) {
      try {
        const res = await Api.get('/employee')
        commit('listEmployees', res.data.employees)
      } catch (error) {
        commit('displaySnackbarMessage', error.response.data.message, {root: true})
      }
    }
  }

}
