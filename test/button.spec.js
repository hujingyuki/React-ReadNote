import React from 'react'
import TestUtils from 'react-dom/test-utils'
import ShallowRenderer from 'react-test-renderer/shallow'
import jest from 'jest-mock'
import Button from './button'

test('works', () => {
  expect(true).toBe(true)
})

test('renders with text', () => {
  const text = '123'
  const renderer = new ShallowRenderer()
  renderer.render(<Button text={text} />)
  const button = renderer.getRenderOutput()
  expect(button.type).toBe('button')
  expect(button.props.children).toBe(text)
})

test('fires the onClick callback', () => {
  const onClick = jest.fn()
  const tree = TestUtils.renderIntoDocument(<Button onClick={onClick} />)
  const button = TestUtils.findRenderedDOMComponentWithTag(tree, 'button')
  TestUtils.Simulate.click(button)
  expect(onClick).toBeCalled()
})
