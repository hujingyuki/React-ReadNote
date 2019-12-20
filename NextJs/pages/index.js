import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'

class App extends React.Component {
  static async getInitialProps () {
    const url = 'https://api.github.com/users/gaearon/gists'
    const response = await fetch(url)
    const gists = await response.json()
    return {
      gists
    }
  }

  render () {
    return (
      <ul>
        {this.props.gists.map(gist => (
          <li key={gist.id}>{gist.description}</li>))}    
      </ul>
    )
  }
}

App.propTypes = { gists: PropTypes.array, }

export default App
