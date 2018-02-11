import React, { Component } from 'react'

class Block extends Component {
  constructor(props){
    super(props)
    this.state = {
      x: Math.floor(Math.random() * (window.screen.width-100)),
      y: Math.floor(Math.random() * (window.screen.height-100)),
      offsetX: 0,
      offsetY: 0,
      colours: props.colours
    }
  }

  calculateMovement(mouseMovement) {
    let blockPosition = this.state

    switch (mouseMovement.xAxis) {
      case 'RIGHT':
        if (blockPosition.offsetX < 50)  { 
          blockPosition.offsetX += 1
        }
        break
      case 'LEFT':
        if (blockPosition.offsetX > -50 ) {
        blockPosition.offsetX -= 1
        }
        break
    }

    switch(mouseMovement.yAxis) {
      case 'UP':
        if (blockPosition.offsetY < 50)  { 
          blockPosition.offsetY += 1 
        } 
        break
      case 'DOWN':
        if (blockPosition.offsetY > -50 ) {
          blockPosition.offsetY -= 1
        }
        break
    }

    this.setState(blockPosition)
  }

  componentWillReceiveProps(nextProps) {
    this.calculateMovement(nextProps.mouseMovement)
  }

  render() {
    let {x, y, offsetX, offsetY} = this.state
    return(
      <div className='element' style={{
        left: `${x+offsetX}px`,
        top: `${y+offsetY}px`,
        animation: `backgroundStandBy 5s ease-in-out infinite` }}>
        <div className='top-left' style={{ backgroundColor: `${this.state.colours[0]}`}}></div>
        <div className='top-right' style={{backgroundColor: `${this.state.colours[1]}`}}></div>
        <div className='bottom' style={{backgroundColor: `${this.state.colours[2]}`}}></div>
      </div>
    )
  }
}

export default Block