import React from 'react'
import ReactDOM from 'react-dom'

const Header = (head) => {
  return (
    <div>
      <h1>
        {head.string}
      </h1>
    </div>
  )
}

const Content = (cont) => {
  const [eka, toka, kolmas] = cont.parts
  return (
    <div>
      <Part str={eka.name} num={eka.exercises} />
      <Part str={toka.name} num={toka.exercises} />
      <Part str={kolmas.name} num={kolmas.exercises} />
    </div>
  )
}

const Total = (points) => {
  const [eka, toka, kolmas] = points.parts
  return (
    <div>
      <p>Number of exercises {eka.exercises + toka.exercises + kolmas.exercises}</p>
    </div>
  )
}

const Part = (prt) => {
  return (
    <p>{prt.str} {prt.num}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 15
      }
    ]
  }

  return (
    <div>
      <Header string={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
