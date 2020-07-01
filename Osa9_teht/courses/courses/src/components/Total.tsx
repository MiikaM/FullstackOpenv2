import React, { FC } from "react";
import { CourseProps } from '../index'

const Total: FC<CourseProps> = (props) => {

  const exerciseAmount = props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <p>
        Number of exercises: {exerciseAmount}
      </p>
    </div>
  )
}

export default Total