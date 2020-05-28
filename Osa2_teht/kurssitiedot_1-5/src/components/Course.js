import React from 'react'

//Ottaa sille syötetyn merkkijonon ja luo siitä headerin
const Header = ({ string }) => {
  return (
    <h1>
      {string}
    </h1>
  )
}

//Kutsuu komponentteja Part ja total
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

//Laskee kaikkien kurssin osien tehtävä määrät yhteen
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

//Luo paragraafin kurssin osalle
const Part = ({ part }) => {

  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

//Kutsuu Header ja Content komponenttia
const Course = ({ course }) => {
  return (
    <div>
      <Header string={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

export default Course