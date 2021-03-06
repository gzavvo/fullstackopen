import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.stat}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.stats.good + props.stats.neutral + props.stats.bad
  const average = (props.stats.good - props.stats.bad) / total
  const positive = props.stats.good / total * 100

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='good' stat={props.stats.good}/>
        <Statistic text='neutral' stat={props.stats.neutral}/>
        <Statistic text='bad' stat={props.stats.bad}/>
        <Statistic text='all' stat={total} />
        <Statistic text='average' stat={average} />
        <Statistic text='positive' stat={positive.toString() + ' %'} />
      </tbody>
    </table>
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
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const increaseGood = () => {
    const newStats = {
      ...stats,
      good: stats.good + 1
    }
    setStats(newStats)
  }

  const increaseNeutral = () => {
    const newStats = {
      ...stats,
      neutral: stats.neutral + 1
    }
    setStats(newStats)
  }

  const increaseBad = () => {
    const newStats = {
      ...stats,
      bad: stats.bad + 1
    }
    setStats(newStats)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={increaseGood} />
      <Button text='neutral' handleClick={increaseNeutral} />
      <Button text='bad' handleClick={increaseBad} />
      <h1>statistics</h1>
      <Statistics stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
