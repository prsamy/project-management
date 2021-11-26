import Api from './Api'

export const projectService = {
  getAll: async () => {
    try {
      const res = await Api.get('/project')
      return { status: res.status, data: res.data }
    } catch (error) {
      return { status: error.response.status, data: error.response.data }
    }
  }
}
