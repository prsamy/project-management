/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AddProjectDialogue from '../../src/components/project/AddProjectDialogue.vue'

describe('Project.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AddProjectDialogue)
  })

  it('check initial value in add project dialogue data', () => {
    expect(wrapper.vm.name).to.be.a('string')
    expect(wrapper.vm.employees).to.be.an('array').that.is.empty
  })

  after(() => {
    wrapper.destroy()
  })
})
