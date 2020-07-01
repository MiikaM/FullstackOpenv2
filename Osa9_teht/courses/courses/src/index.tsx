import React, { FC } from "react";
import ReactDOM from 'react-dom'

import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

export interface CourseProps {
  courseParts: CoursePart[];
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description?: string
}

interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
  description?: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  description?: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescription {
  name: "Typescript to win!";
  exerciseCount: number;
  description: string;
  author: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


const App: FC = () => {

  const courseName = "Half Stack application development";

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Typescript to win!",
      exerciseCount: 27,
      description: 'Having fun with typescript',
      author: "Miika Mikkonen"
    }
  ];


  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
