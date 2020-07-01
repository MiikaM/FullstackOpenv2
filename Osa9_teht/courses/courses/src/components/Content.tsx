import React, { FC } from "react";
import { CourseProps } from '../index'

const Content: FC<CourseProps> = (props) => {

  return (
    <div>
      {
        props.courseParts.map((part: any) =>
          <p key={part.name}>{part.name} {part.exerciseCount}</p>
        )
      }
    </div>
  )
}

export default Content