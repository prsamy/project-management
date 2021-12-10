import Api from '../../service/Api'

export default {
  namespace: true,
  state: {
    projects: []
  },
  mutations: {
    listProjects (state, projects) {
      state.projects = projects
    },
    addProject (state, project) {
      state.projects = [...state.projects, project]
    },
    editProject (state, {id, project}) {
      console.log('edited project ', {id, ...project})
      state.projects = state.projects.map(proj => proj.id === id ? {id, ...project} : proj)
    }
  },
  actions: {
    async fetchProjects ({commit}) {
      try {
        const res = await Api.get('/project')
        commit('listProjects', res.data.projects)
      } catch (error) {
        commit('displaySnackbarMessage', error.response.data.message, {root: true})
      }
    },

    async pushProject ({commit}, payload) {
      console.log('Project in service: ', payload.project)
      try {
        const res = await Api.post('/project', payload.project)
        if (res.status === 200) {
          commit('addProject', payload.project)
          commit('displaySnackbarMessage', `Project ${payload.project.name} is added successfully`, {root: true})
        }
      } catch (error) {
        commit('displaySnackbarMessage', error.response.data.message, {root: true})
      }
    },

    async editProject ({commit}, payload) {
      console.log('Project update in service: ', payload.id)
      try {
        const res = await Api.put(`/project/${payload.id}`, payload.project)
        if (res.status === 200) {
          commit('editProject', payload)
          commit('displaySnackbarMessage', `Project ${payload.project.name} is updated successfully`, {root: true})
        }
      } catch (error) {
        console.log(error)
        commit('displaySnackbarMessage', error.response.data.message, {root: true})
      }
    }
  }

}
