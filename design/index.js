import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css'

const Button = () => <button className={styles.button}>Click me!</button>

ReactDOM.render(<Button />, document.body)
