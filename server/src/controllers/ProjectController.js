const { addProject, getAllProjects, getProjectIndex, getProject, updateProject } = require('../util')

const { validationResult } = require('express-validator')

module.exports = {
  add (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (getProjectIndex(req.body.id) > -1) {
      return res.status(403).send({ message: 'project is already added' })
    }

    addProject(req.body)
    res.send({ message: 'project is added successfully' })
  },

  update (req, res) {
    if (updateProject(req.params.id, req.body)) {
      res.send({ message: 'project is updated successfully' })
    } else {
      res.status(404).send({ message: 'project not found' })
    }
  },

  getAll (req, res) {
    const projects = getAllProjects()
    if (projects.length > 0) {
      res.status(200).json({ projects })
    } else {
      res.status(404).send({ message: 'projects not found' })
    }
  },

  get (req, res) {
    const proj = getProject(req.params.id)
    if (proj) {
      res.status(200).json(proj)
    } else {
      res.status(404).send({ message: 'project not found' })
    }
  }
}
