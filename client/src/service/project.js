import Api from './Api'

export const projectService = {
  getAll: async () => {
    try {
      const res = await Api.get('/project')
      return { status: res.status, data: res.data }
    } catch (error) {
      return { status: error.response.status, data: error.response.data }
    }
  },

  add: async (project) => {
    console.log('Project in service: ', project)
    try {
      const res = await Api.post('/project', project)
      return {status: res.status, data: res.data}
    } catch (error) {
      return { status: error.response.status, data: error.response.data }
    }
  },

  update: async (id, project) => {
    console.log('Project update in service: ', id)
    try {
      const res = await Api.put(`/project/${id}`, project)
      return {status: res.status, data: res.data}
    } catch (error) {
      return { status: error.response.status, data: error.response.data }
    }
  }
}
