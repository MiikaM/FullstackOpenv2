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
  return (
    <div>
      {
        content.map(part =>
          <Part key={part.name.slice(0, 5)} part={part} />
        )
      }
      <Total exers={content} />
    </div>
  )
}

// const ExercCounter = (numbers) => {
//   let exerArray = []  
//   for (let i = 0; i < numbers.length; i++) {
//     console.log(numbers.exercises)
//     exerArray.push(numbers.exercises)
//     }

//   return exerArray
// }


const Total = ({ exers }) => {

  const total = exers.reduce( (s, p) => {
    let totals = s + p.exercises
    return totals
  }, 0)

  return (
    <div>
      <h4>total of {total} exercises </h4>
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
  console.log('course', course)
  return (
    <div>
      <Header string={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      {
        courses.map(part =>
          <Course key={part.name} course={part} />
        )
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
