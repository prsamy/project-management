import Api from './Api'

export const employeeService = {
  getAll: async () => {
    try {
      const res = await Api.get('/employee')
      return { status: res.status, data: res.data }
    } catch (error) {
      return { status: error.response.status, data: error.response.data }
    }
  },

  addEmployee: async (employee) => {
    try {
      const res = await Api.post('/employee', employee)
      return {status: res.status, data: res.data}
    } catch (error) {
      return { status: error.response.status, data: error.response.data }
    }
  }
}
