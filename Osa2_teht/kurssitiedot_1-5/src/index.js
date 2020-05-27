import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ string }) => {
  return (
    <h1>
      {string}
    </h1>
  )
}

const Content = ({ content }) => {
  console.log(content)
  return (
    <div>
      {
        content.map(part =>
          <Part key={part.name.slice(0, 5)} part={part} />
        )
      }
    </div>
  )
}

const Total = ({ exer }) => {
  let total = 0

  for(let i = 0; i < exer.length; i++) {
    total += exer[i].exercises
  }

  return (
    <div>
      <p>total of {total} exercises </p>
    </div>
  )
}

const Part = ({ part }) => {
  
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header string={course.name} />
      <Content content={course.parts} />
      <Total exer={course.parts} />
    </div>
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
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
      <div>
        <Course course={course} />
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
