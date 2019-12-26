import React from 'react'
import {
  shallow,
  mount,
  configure
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'
import Controlled from './controlled'

configure({
  adapter: new Adapter()
})

class Page {
  constructor (wrapper) {
    this.wrapper = wrapper
  }

  fill (name, value) {
    const field = this.wrapper.find(`[name="${name}"]`)
    field.simulate('change', {
      target: {
        name,
        value
      }
    })
  }

  submit () {
    const form = this.wrapper.find('form')
    form.simulate('submit', { preventDefault () {} })
  }
}

test('submits the form', () => {
  const onSubmit = jest.fn()
  const wrapper = shallow(<Controlled onSubmit={onSubmit} />)
  const page = new Page(wrapper)
  page.fill('firstName', 'Christopher')
  page.fill('lastName', 'Chedeau')
  page.submit()
  expect(onSubmit).toHaveBeenCalledWith('Christopher Chedeau')
})
