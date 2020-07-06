import React, { FC } from "react";
import { CourseProps, CoursePart } from '../index'

import Part from './Part'

const Content: FC<CourseProps> = (props) => {

  return (
    <div>
      {
        props.courseParts.map((part: CoursePart) =>
          <Part key={part.name} {...part} />
        )
      }
    </div>
  )
}

export default Content