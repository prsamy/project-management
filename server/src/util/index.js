const fs = require('fs')
const path = require('path')

const empFilePath = path.resolve(__dirname, '../models/gsk.json')

const initFile = () => {
  const data = { employees: [], projects: [] }
  try {
    const content = fs.readFileSync(empFilePath)
    if (content.length === 0) {
      fs.writeFileSync(empFilePath, JSON.stringify(data))
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File does not exist, creating new file')
      fs.writeFileSync(empFilePath, JSON.stringify(data))
    }
  }
}

const deleteFile = () => {
  try {
    fs.unlinkSync(empFilePath)
    console.log('successfully deleted /tmp/hello')
  } catch (error) {
    console.log(error)
  }
}

const autoGenId = () => {
  return Math.floor(100 + Math.random() * 900)
}

const getFileContent = () => {
  return JSON.parse(fs.readFileSync(empFilePath))
}

const getEmployeeIndex = (id) => {
  const data = getFileContent()
  return data.employees.length > 0 ? data.employees.findIndex(e => e.id === id) : -1
}

const getProjectIndex = (id) => {
  const data = getFileContent()
  return data.projects.length > 0 ? data.projects.findIndex(e => e.id === parseInt(id)) : -1
}

const convertEmployeeIDToObjectInProject = (proj) => {
  const allEmp = []
  for (const empId of proj.employees) {
    allEmp.push(getFileContent().employees[getEmployeeIndex(empId)])
  }
  proj.employees = allEmp
  return proj
}

const getAllEmployees = () => {
  return getFileContent().employees
}

const getAllProjects = () => {
  const allProj = []
  for (let proj of getFileContent().projects) {
    if (proj.employees.length > 0) {
      proj = convertEmployeeIDToObjectInProject(proj)
    }
    allProj.push(proj)
  }
  return allProj
}

const getProject = (id) => {
  const idx = getProjectIndex(id)
  if (idx >= 0) {
    let proj = getFileContent().projects[idx]
    if (proj.employees.length > 0) {
      proj = convertEmployeeIDToObjectInProject(proj)
    }
    return proj
  }
}

const addEmployee = (body) => {
  const data = getFileContent()
  data.employees.push(body)
  fs.writeFileSync(empFilePath, JSON.stringify(data))
}

const addProject = (body) => {
  const data = getFileContent()
  data.projects.push({ id: autoGenId(), ...body })
  fs.writeFileSync(empFilePath, JSON.stringify(data))
}

module.exports = {
  initFile,
  deleteFile,
  getFileContent,
  addEmployee,
  getEmployeeIndex,
  getAllEmployees,
  addProject,
  getProjectIndex,
  getAllProjects,
  getProject
}
