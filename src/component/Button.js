
import React from "react";
import "./Button.css";


const Button = ({ name, wide, orange, clickHandler }) => {
  const handleClick = () => {
    clickHandler(name)
  }

  const className = [ "component-button", orange ? "orange" : "", wide ? "wide" : "",];
 
  return (
      <div className={className.join(" ").trim()}>
        <button onClick={() => handleClick(name)}>{name}</button>
      </div>
  )
}

export default Button 