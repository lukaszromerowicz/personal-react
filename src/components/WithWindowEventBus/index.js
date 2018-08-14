import React, { Component } from 'react'
import { SubPub } from '../../util'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.eventBus = new SubPub()
    }

    componentDidMount() {
      'ontouchstart' in document.documentElement
        ? window.addEventListener('deviceorientation', () => this.eventBus.publish('deviceOrientation', event))
        : window.addEventListener('mousemove', () => this.eventBus.publish('mouseMove', event))
    }

    render() {
      return (
        <WrappedComponent
          windowEventBus={this.eventBus} {...this.props}
        />
      )
    }
  }
}