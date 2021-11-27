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
  return data.employees.length > 0 ? data.employees.findIndex(e => parseInt(e.id) === parseInt(id)) : -1
}

const getProjectIndex = (id) => {
  const data = getFileContent()
  return data.projects.length > 0 ? data.projects.findIndex(e => parseInt(e.id) === parseInt(id)) : -1
}

const getAllEmployees = () => {
  return getFileContent().employees
}

const getAllProjects = () => {
  return getFileContent().projects
}

const getProject = (id) => {
  const idx = getProjectIndex(id)
  if (idx >= 0) {
    const proj = getFileContent().projects[idx]
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

const updateProject = (id, body) => {
  let updated = false
  const fileContent = getFileContent()
  const idx = getProjectIndex(parseInt(id))
  if (idx >= 0) {
    fileContent.projects[idx] = { ...body, id: parseInt(id) }
    fs.writeFile(empFilePath, '', function () { })
    fs.writeFileSync(empFilePath, JSON.stringify(fileContent))
    updated = true
  }
  return updated
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
  getProject,
  updateProject
}
