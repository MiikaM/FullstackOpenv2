import React from 'react'

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

export default  StatisticLine