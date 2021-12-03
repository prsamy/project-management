const util = require('../src/util')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

chai.use(chaiHttp)

before((done) => {
  util.deleteFile()
  util.initFile()
  done()
})

// testing on employees
describe('Employees', () => {
  describe('Add Employee', () => {
    it('it should add one employee', (done) => {
      const employee = {
        id: '12345a',
        name: 'prakash'
      }
      chai
        .request(app)
        .post('/api/employee')
        .send(employee)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('employee is added successfully')
          done()
        })
    })
    it('it should not add an employee with inlvalid id', (done) => {
      const employee = {
        id: '123 a',
        name: 'prakash'
      }
      chai
        .request(app)
        .post('/api/employee')
        .send(employee)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.have.nested.property('errors[0].msg').eql('id must be alphanumeric')
          res.body.should.have.nested.property('errors[1].msg').eql('length of id musst be 6')
          done()
        })
    })
    it('it should not add an employee with inlvalid name', (done) => {
      const employee = {
        id: '12345a',
        name: 'p '
      }
      chai
        .request(app)
        .post('/api/employee')
        .send(employee)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.have.nested.property('errors[0].msg').eql('name must be alphabet')
          res.body.should.have.nested.property('errors[1].msg').eql('length of name must be in the range of 3 and 50')
          done()
        })
    })
  })
  describe('GET Employees', () => {
    it('it should get all employees', done => {
      chai
        .request(app)
        .get('/api/employee')
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.have.nested.property('employees[0].name').eql('prakash')
          done()
        })
    })
    it('it should get one employee', done => {
      chai
        .request(app)
        .get('/api/employee/12345a')
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name').eql('prakash')
          done()
        })
    })
    it('it should not get non-existing employee', done => {
      chai
        .request(app)
        .get('/api/employee/123')
        .end((_err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('employee not found')
          done()
        })
    })
  })
})

// testing on projects
describe('Projects', () => {
  describe('Get Empty Projects', () => {
    it('it should get no projects', done => {
      chai
        .request(app)
        .get('/api/project')
        .end((_err, res) => {
          res.should.have.status(404)
          res.body.should.have.property('message').eql('projects not found')
          done()
        })
    })
  })
  describe('Add Project', () => {
    it('it should add one project', (done) => {
      const project = {
        name: 'GSK Sample project 123',
        description: 'GSK Sample project is here for testing purpose only. I am trying my best to come up with clean code by following some priciples',
        date: '2021-11-22',
        employees: []
      }
      chai
        .request(app)
        .post('/api/project')
        .send(project)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('project is added successfully')
          done()
        })
    })
    it('it should add one project with an employee', (done) => {
      const project = {
        name: 'GSK Sample project 123',
        description: 'GSK Sample project is here for testing purpose only. I am trying my best to come up with clean code by following some priciples',
        date: '2021-11-22',
        employees: ['12345a']
      }
      chai
        .request(app)
        .post('/api/project')
        .send(project)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('project is added successfully')
          done()
        })
    })
    it('it should not add a project with special chars in name', (done) => {
      const project = {
        name: 'GSK Sample Project $',
        description: 'GSK Sample project is here for testing purpose only. I am trying my best to come up with clean code by following some priciples',
        date: '2021-11-22',
        employees: []
      }
      chai
        .request(app)
        .post('/api/project')
        .send(project)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.have.nested.property('errors[0].msg').eql('project name must in alphanumeric')
          done()
        })
    })
    it('it should not add a project with a name with insufficient length', (done) => {
      const project = {
        name: 'GSK',
        description: 'GSK Sample project is here for testing purpose only. I am trying my best to come up with clean code by following some priciples',
        date: '2021-11-22',
        employees: []
      }
      chai
        .request(app)
        .post('/api/project')
        .send(project)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.have.nested.property('errors[0].msg').eql('length of name must be in the range of 10 and 80')
          done()
        })
    })
    it('it should not add a project with a description with insufficient length', (done) => {
      const project = {
        name: 'GSK Sample project',
        description: 'GSK project description with insufficient',
        date: '2021-11-22',
        employees: []
      }
      chai
        .request(app)
        .post('/api/project')
        .send(project)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.have.nested.property('errors[0].msg').eql('length of description must be in the range of 50 and 300')
          done()
        })
    })
    it('it should not add a project with an invalid start date', (done) => {
      const project = {
        name: 'GSK Sample project',
        description: 'GSK Sample project is here for testing purpose only. I am trying my best to come up with clean code by following some priciples',
        date: '2021',
        employees: []
      }
      chai
        .request(app)
        .post('/api/project')
        .send(project)
        .end((_err, res) => {
          res.should.have.status(400)
          res.body.should.have.nested.property('errors[0].msg').eql('must be valid date')
          done()
        })
    })
  })
  describe('Get Projects', () => {
    it('it should get all projects with an employee', done => {
      chai
        .request(app)
        .get('/api/project')
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.have.nested.property('projects[1].employees[0]').eql('12345a')
          done()
        })
    })
  })
})
