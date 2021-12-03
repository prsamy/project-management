/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProjectManagement from '../../src/components/ProjectManagement.vue'
import Project from '../../src/components/project/Project.vue'
import Employee from '../../src/components/employee/Employee.vue'

describe('Project management', () => {
  let wrapper

  before(() => {
    wrapper = shallowMount(ProjectManagement)
  })

  it('check attributes of project management', () => {
    expect(wrapper.attributes('id')).to.equal('project-management_header')
  })
  it('check existence of project child component in project management component', () => {
    const project = wrapper.findComponent(Project)
    expect(project.exists()).to.be.true
  })
  it('check existence of project child component in project management component', () => {
    const employee = wrapper.findComponent(Employee)
    expect(employee.exists()).to.be.true
  })
  it('check attributes of project child component', () => {
    const project = wrapper.findComponent(Project)
    expect(project.attributes('id')).to.equal('project-management_project')
    expect(project.attributes('class')).to.equal('project-management_element')
  })
  it('check attributes of employee child component', () => {
    const employee = wrapper.findComponent(Employee)
    expect(employee.attributes('id')).to.equal('project-management_employee')
    expect(employee.attributes('class')).to.equal('project-management_element')
  })

  after(() => {
    wrapper.destroy()
  })
})
