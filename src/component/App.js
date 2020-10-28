import React, { useState } from 'react'
import Display from './Display'
import ButtonPanel from './ButtonPanel'
import calculate from '../logic/calculate'

const App = () => {
  const [ total, setTotal, next, setNext, operation, setOperation ] = useState(null)

  const handleClick = (buttonName) => {
    setTotal(calculate(buttonName))
    setNext(calculate(buttonName))
    setOperation(calculate(buttonName))
  }

  return (
    <div className="component-app">
      <Display value={ next || total || operation || "0" } /> 
      <ButtonPanel clickHandler={() => handleClick()}/> 
    </div>
  )
}

export default App