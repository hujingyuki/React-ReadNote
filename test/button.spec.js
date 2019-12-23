import React from 'react'
import TestUtils from 'react-dom/test-utils'
import TestRenderer from 'react-test-renderer'
import jest from 'jest-mock'
import Button from './button'

test('works', () => {
  expect(true).toBe(true)
})

test('renders with text', () => {
  const text = '123'
  const testRenderer = TestRenderer.create(<Button text={text} />)
  const testInstance = testRenderer.root
  expect(testInstance.props.text).toBe(text)
  // expect(testInstance.type).toBe('[Function Button]')
})

test('fires the onClick callback', () => {
  const onClick = jest.fn()
  const tree = TestUtils.renderIntoDocument(<Button onClick={onClick} />)
  const button = TestUtils.findRenderedDOMComponentWithTag(tree, 'button')
  TestUtils.Simulate.click(button)
  expect(onClick).toBeCalled()
})
