import React, { Component } from 'react'
import { render } from 'react-dom'
import './style/style.scss' 
import FloatingBlock from './components/floating-block'

export default class App extends Component {
  constructor(props) {
    super(props)

    let noOfBackgroundBlocks
    if (window.outerWidth > 1200) {
      noOfBackgroundBlocks = 15
    } else {
      noOfBackgroundBlocks = 10
    }

    this.state = {
      mouseX: 0,
      mouseY: 0,
      mouseMovement: {
        xAxis: '',
        yAxis: ''
      },
      noOfBackgroundBlocks,
      colours: [["#FFC107","#FFECB3","#FFA000"], ["#7E57C2","#B39DDB","#4527A0"], ["#009688","#B2DFDB","#00796B"]]
    }
  }

  onMouseMove(event) {
    let currentMouseMovement = this.state.mouseMovement
    
    if (event.clientX  > this.state.mouseX) {
      currentMouseMovement.xAxis = 'RIGHT'
    } else if (event.clientX < this.state.mouseX) {
      currentMouseMovement.xAxis = 'LEFT'
    } else {
      currentMouseMovement.xAxis = 'NONE'
    }
    
    if (this.state.mouseY < event.clientY ) {
      currentMouseMovement.yAxis = 'UP'
    } else if (this.state.mouseY > event.clientY ) {
      currentMouseMovement.yAxis = 'DOWN'
    } else {
      currentMouseMovement.yAxis = 'NONE'
    }

    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY,
      mouseMovement: currentMouseMovement,
    })
  }

  render() {
    const backgroundBlocks = []

    for (let i = 0; i< this.state.noOfBackgroundBlocks; i++) {
      let colorway = Math.floor(Math.random() * 3)
      backgroundBlocks.push(<FloatingBlock key={i} colours={this.state.colours[colorway]} mouseMovement={this.state.mouseMovement}/>)
    }

    return (
      <main onMouseMove={this.onMouseMove.bind(this)}>
        {backgroundBlocks}
        <header>Łukasz Romerowicz</header>
        <nav>
          <ul>
            <li><a href="https://uk.linkedin.com/in/łukasz-romerowicz-44212a10a">LinkedIn</a></li>
            <li><a href="https://github.com/lukaszromerowicz">GitHub</a></li>
            <li><a href="mailto:lukaszromerowicz@gmail.com">E-mail</a></li>
          </ul>
        </nav>
      </main>
    )
  }
}

render(<App/>, document.getElementById('app'))