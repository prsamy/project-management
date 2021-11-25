const { body } = require('express-validator')
const EmployeeController = require('./controllers/EmployeeController')
const ProjectController = require('./controllers/ProjectController')

module.exports = (app) => {
  app.post('/api/employee', validateEmployeeId(body), validateEmployeeName(body), EmployeeController.add)
  app.get('/api/employee', EmployeeController.getAll)
  app.get('/api/employee/:id', EmployeeController.get)

  app.get('/api/project', ProjectController.getAll)
  app.get('/api/project/:id', ProjectController.get)
  app.put('/api/project/:id', ProjectController.update)
  app.post('/api/project', validateProjectName(body), validateProjectDescription(body), validateProjectStartDate(body), ProjectController.add)
}

const validateEmployeeId = (body) => body('id').isAlphanumeric().withMessage('id must be alphanumeric').isLength({ min: 6, max: 6 }).withMessage('length of id musst be 6')
const validateEmployeeName = (body) => body('name').isAlpha().withMessage('name must be alphabet').isLength({ min: 3, max: 50 }).withMessage('length of name must be in the range of 3 and 50')

const validateProjectName = (body) => body('name').matches(/^[a-zA-Z\d\-_\s]+$/).withMessage('project name must in alphanumeric').isLength({ min: 10, max: 80 }).withMessage('length of name must be in the range of 10 and 80')
const validateProjectDescription = (body) => body('description').isLength({ min: 50, max: 300 }).withMessage('length of description must be in the range of 50 and 300')
const validateProjectStartDate = (body) => body('date').isDate().withMessage('must be valid date')
