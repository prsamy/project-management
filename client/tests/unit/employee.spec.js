/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Employee from '../../src/components/employee/Employee.vue'

describe('Employee.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Employee)
  })

  it('check initial value in employee data', () => {
    expect(wrapper.vm.showDialogue).to.be.false
    expect(wrapper.vm.employees).to.be.an('array').that.is.empty
  })

  after(() => {
    wrapper.destroy()
  })
})
