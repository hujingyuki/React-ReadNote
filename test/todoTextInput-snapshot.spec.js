import React from 'react'
import renderer from 'react-test-renderer'
import TodoTextInput from './todoTextInput'

test('snapshots are awesome', () => {
  const component = renderer.create(<TodoTextInput editing onSave={() => {}} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
