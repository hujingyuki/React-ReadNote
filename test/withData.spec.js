import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'
import withData from './withData'
import getJSON from './get-json'

configure({
  adapter: new Adapter()
})

const data = 'data'
const List = () => <div />
jest.mock('./get-json')

test('passes the props to the component', () => {
  const ListWithGists = withData()(List)
  const username = 'gaearon'
  const wrapper = shallow(<ListWithGists username={username} />)
  expect(wrapper.prop('username')).toBe(username)
})

test('uses the string url', () => {
  const url = 'https://api.github.com/users/gaearon/gists'
  const withGists = withData(url)
  const ListWithGists = withGists(List)
  mount(<ListWithGists />)
  expect(getJSON.mockResolvedValue(data)).toHaveBeenCalledWith(url)
})

test('uses the function url', () => {
  const url = jest.fn(props => (`https://api.github.com/users/${props.username}/gists`))
  const withGists = withData(url)
  const ListWithGists = withGists(List)
  const props = { username: 'gaearon' }
  mount(<ListWithGists {...props} />)
  expect(url).toHaveBeenCalledWith(props)
  expect(getJSON.mockResolvedValue(data)).toHaveBeenCalledWith('https://api.github.com/users/gaearon/gists')
})

test('passes the data to the component', () => {
  const ListWithGists = withData()(List)
  const wrapper = mount(<ListWithGists />)
  expect(wrapper.prop('data')).toEqual(data)
})
