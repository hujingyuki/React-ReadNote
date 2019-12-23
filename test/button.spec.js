import React from 'react'
import TestRenderer from 'react-test-renderer'
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
