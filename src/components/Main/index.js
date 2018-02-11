import React, { Component } from 'react'
import Background from '../Background'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseX: 0,
      mouseY: 0,
      mouseMovement: {
        xAxis: '',
        yAxis: ''
      }
    }
    this.colours= [["#FFC107","#FFECB3","#FFA000"], ["#7E57C2","#B39DDB","#4527A0"], ["#009688","#B2DFDB","#00796B"]]
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
    return (
      <main onMouseMove={this.onMouseMove.bind(this)}>
        <Background mouseMovement={this.state.mouseMovement} colours={this.colours}/>
        {this.props.children}
      </main>
    )
  }
}