/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Project from '../../src/components/project/Project.vue'
import AddProjectDialogue from '../../src/components/project/AddProjectDialogue.vue'

describe('Project.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Project)
  })

  it('check initial value in project data', () => {
    expect(wrapper.vm.showDialogue).to.be.false
    expect(wrapper.vm.projects).to.be.an('array').that.is.empty
    expect(wrapper.vm.editableProject).to.be.an('undefined')
  })
  it('check existence of add project form modal', () => {
    expect(wrapper.findComponent(AddProjectDialogue).exists()).to.be.true
  })

  after(() => {
    wrapper.destroy()
  })
})
