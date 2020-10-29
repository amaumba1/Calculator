import React, { useState } from 'react'
import Display from './Display'
import ButtonPanel from './ButtonPanel'
import calculate  from '../logic/calculate'
import './App.css'

const App = () => {
  const [ calc, setCalc ] = useState({ total: null , next: null , operation: null })

  const handleClick = buttonName => {
    // first option 
    // setCalc(prevState => ({...prevState, ...calculate(calc, buttonName)}))

    // second option 
    // setCalc({...calc, ...calculate(calc, buttonName)});

    // third option 
    // const updatedVal = calculate(calc, buttonName)
    // setCalc(prevState => ({...prevState, ...updatedVal}))

    // four option 
    const updatedVal = calculate(calc, buttonName)
    setCalc(prevState => {
      return {...prevState, ...updatedVal}
    })
  }

  return (
    <div className="component-app">
      <Display value={ calc.next || calc.total || "0" } /> 
      <ButtonPanel clickHandler={handleClick}/> 
    </div>
  )
}

export default App 

// import React from "react";
// import Display from "./Display";
// import ButtonPanel from "./ButtonPanel";
// import calculate from "../logic/calculate";
// import "./App.css";

// export default class App extends React.Component {
//   state = {
//     total: null,
//     next: null,
//     operation: null,
//   };

//   handleClick = buttonName => {
//     this.setState(calculate(this.state, buttonName));
//   };

//   render() {
//     return (
//       <div className="component-app">
//         <Display value={this.state.next || this.state.total || "0"} />
//         <ButtonPanel clickHandler={this.handleClick} />
//       </div>
//     );
//   }
// }