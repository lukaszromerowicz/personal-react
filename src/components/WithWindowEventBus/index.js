import React, { Component } from 'react'
import { PubSub } from '../../util'
import debounce from 'lodash.debounce'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.eventBus = new PubSub()
      this.eventBus.publish = debounce(this.eventBus.publish, 10)
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