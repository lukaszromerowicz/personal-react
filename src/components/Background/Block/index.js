import React, { Component, createRef } from 'react'

class Block extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: Math.floor(Math.random() * (window.screen.width - 100)),
      y: Math.floor(Math.random() * (window.screen.height - 100)),
      colour: ['green', 'violet', 'orange'][Math.floor(Math.random() * (3))],
      isTouchDevice: 'ontouchstart' in document.documentElement
    }
    this.mouseX = 0
    this.mouseY = 0
    this.offsetX = 0
    this.offsetY = 0
    this.containerRef = createRef()
  }

  componentDidMount() {
    if (this.state.isTouchDevice) {
      this.props.windowEventBus.subscribe('deviceOrientation', this.handleOrientationChange)
    } else {
      this.props.windowEventBus.subscribe('mouseMove', this.handleMouseMove)
    }
  }

  handleOrientationChange = (event) => {
    if (this.containerRef.current.style.display === 'none') {
      this.containerRef.current.style.display = 'block'
    }

    let x = event.beta
    let y = event.gamma

    if (x >  90) { x =  90}
    if (x < -90) { x = -90}

    if (x < 85)  {
      x += 90
      y += 90

      let offsetY = (100 * Math.abs(x) / 180 - 50)
      let offsetX = (150 * Math.abs(y) / 180 - 50)
  
      this.containerRef.current.style.left = `${this.state.x + offsetX}px`
      this.containerRef.current.style.top = `${this.state.y + offsetY}px`
    }
  }

  handleMouseMove = (event) => {
    if (event.clientX > this.mouseX && this.offsetX < 100) {
      this.offsetX += 1
    } else if (event.clientX < this.mouseX && this.offsetX > -100) {
      this.offsetX -= 1
    }

    if (this.mouseY < event.clientY && this.offsetY < 100) {
      this.offsetY += 1
    } else if (this.mouseY > event.clientY && this.offsetY > -100) {
      this.offsetY -= 1
    }

    this.mouseX = event.clientX
    this.mouseY = event.clientY

    this.containerRef.current.style.left = `${this.state.x + this.offsetX}px`
    this.containerRef.current.style.top = `${this.state.y + this.offsetY}px`
  }

  render() {
    let { x, y, colour } = this.state
    return (
      <div className={`element ${colour}`} ref={this.containerRef} style={{
        left: `${x}px`,
        top: `${y}px`,
        display: this.state.isTouchDevice ? 'none' : 'block',
        animation: `backgroundStandBy 4s ease-in-out infinite, smoothEnter 2s linear`
      }}>
        <div className='top-left'></div>
        <div className='top-right'></div>
        <div className='bottom'></div>
      </div>
    )
  }
}

export default Block