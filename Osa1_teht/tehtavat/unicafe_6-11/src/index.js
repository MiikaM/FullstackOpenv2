import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ click, text }) => (
  <button onClick={click}>
    {text}
  </button>
)

const Statistics = (props) => {
  const good = props.goods
  const neutral = props.neutrals
  const bad = props.bads
  
  const all = good + neutral + bad
  const average = (good + (bad * -1)) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive + '%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <Button click={handleGood} text='Good' />
      <Button click={handleNeutral} text='Neutral' />
      <Button click={handleBad} text='Bad' />
      <h1>statistics</h1>
      <Statistics goods={good} neutrals={neutral} bads={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))