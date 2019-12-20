import React from 'react'
import ReactDOM from 'react-dom'
// import styles from './index.css'
// import Perf from 'react-addons-perf'

// const Button = () => < button className = {
//   styles.button
// } > Click me! < /button>

// ReactDOM.render( < Button / > , document.body)

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: ['foo', 'bar']
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // componentWillUpdate () {
  //   Perf.start()
  // }

  // componentDidUpdate () {
  //   Perf.stop()
  //   Perf.printOperations()
  // }

  handleClick () {
    this.setState({
      items: this.state.items.concat('baz')
    })
  }

  render () {
    return (
      <div>
        <ul>
          {this.state.items.map(item => <li key={item}>{item}</li>)}
        </ul>
        <button onClick={this.handleClick}> + </button>
      </div>
    )
  }
}

ReactDOM.render(<List />, document.body)
