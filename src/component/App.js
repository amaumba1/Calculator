import React, { useState } from 'react'
import Display from './Display'
import ButtonPanel from './ButtonPanel'
import calculate from '../logic/calculate'
import './App.css'

const App = () => {
  const [ total, setTotal ] = useState(null)
  const [ next, setNext ] = useState(null)
  // const [ operation, setOperation ] = useState(null)

  const handleClick = buttonName => {
    setTotal(calculate(buttonName))
    setNext(calculate(buttonName))
    // setOperation(calculate(buttonName))
  }

  return (
    <div className="component-app">
      <Display value={ next || total || "0" } /> 
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