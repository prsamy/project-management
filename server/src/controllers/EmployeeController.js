const { getFileContent, addEmployee, getEmployeeIndex, getAllEmployees } = require('../util')

const { validationResult } = require('express-validator')

module.exports = {
  add (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    if (getEmployeeIndex(req.body.id) > -1) {
      return res.status(403).send({ message: 'employee is already added' })
    }

    addEmployee(req.body)
    res.send({ message: 'employee is added successfully' })
  },

  getAll (req, res) {
    const employees = getAllEmployees()
    if (employees.length > 0) {
      res.status(200).json({ employees })
    } else {
      res.status(404).send({ message: 'employees not found' })
    }
  },

  get (req, res) {
    const idx = getEmployeeIndex(req.params.id)
    if (idx >= 0) {
      res.status(200).json(getFileContent().employees[idx])
    } else {
      res.status(404).send({ message: 'employee not found' })
    }
  }
}
