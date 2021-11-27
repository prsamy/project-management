/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import EmployeeItem from '../../src/components/employee/EmployeeItem.vue'

describe('Project.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(EmployeeItem, {
      propsData: {
        employee: {id: 123456, name: 'Prakash'}
      }
    })
  })

  it('check employee props value assigned', () => {
    expect(wrapper.props('employee')['id']).to.equal(123456)
    expect(wrapper.props('employee')['name']).to.equal('Prakash')
  })
  it('check employee props value set in html template', () => {
    expect(wrapper.html()).to.deep.include(123456)
  })

  after(() => {
    wrapper.destroy()
  })
})
