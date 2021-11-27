/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ProjectForm from '../../src/components/project/ProjectForm.vue'

describe('Project.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProjectForm)
  })

  it('check initial value in project form data', () => {
    expect(wrapper.vm.name).to.be.a('string')
    expect(wrapper.vm.employees).to.be.an('array').that.is.empty
  })

  after(() => {
    wrapper.destroy()
  })
})
