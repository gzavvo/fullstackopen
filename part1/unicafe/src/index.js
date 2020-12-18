import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatLine = (props) => {
  return (
    <p>
      {props.text} {props.stat}
    </p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={increaseGood} />
      <Button text='neutral' handleClick={increaseNeutral} />
      <Button text='bad' handleClick={increaseBad} />
      <h1>statistics</h1>
      <StatLine text='good' stat={good}/>
      <StatLine text='neutral' stat={neutral}/>
      <StatLine text='bad' stat={bad}/>
      <StatLine text='all' stat={total} />
      <StatLine text='average' stat={average} />
      <StatLine text='positive' stat={positive.toString() + ' %'} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
