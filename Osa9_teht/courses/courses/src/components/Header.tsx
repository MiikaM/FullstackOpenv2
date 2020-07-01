import React, { FC } from "react";

const Header: FC<{ name: string }> = (props) => {
  return <h1>Hello, {props.name}</h1>
}

export default Header