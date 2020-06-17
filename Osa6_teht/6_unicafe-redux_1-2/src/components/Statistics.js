import React from 'react'
import StatisticLine from './StatisticLine'


const Statistics = (props) => {
  const good = props.good
  const neutral = props.ok
  const bad = props.bad

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

export default Statistics
