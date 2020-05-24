import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({click, text}) => (
  <button onClick={click}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={handleGood} text='Good' />
      <Button click={handleNeutral} text='Neutral' />
      <Button click={handleBad} text='Bad' />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))