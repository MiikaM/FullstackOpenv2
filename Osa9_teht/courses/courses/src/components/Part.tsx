import React, { FC } from "react";
import { CoursePart } from '../index'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: FC<CoursePart> = (props) => {

  switch (props.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>{props.name} {props.description} {props.exerciseCount}</p>
        </div>
      )
    case 'Using props to pass data':
      return (
        <div>
          <p>{props.name} {props.groupProjectCount} {props.exerciseCount}</p>
        </div>
      )
    case 'Deeper type usage':
      return (
        <div>
          <p>{props.name} {props.description} {props.exerciseSubmissionLink} {props.exerciseCount}</p>
        </div>
      )

    case 'Typescript to win!':
      return (
        <div>
          <p>{props.name} {props.description} {props.exerciseCount} {props.author}</p>
        </div>
      )
    default:
      return assertNever(props);
  }
}

export default Part