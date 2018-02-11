import React, { Component } from 'react'
import Block from './Block'

export default class Background extends Component{
  constructor(props) {
    super(props)
    this.blocks = []
    
    for(let i= 0; i<15; i++ ){
      this.blocks.push({colours: this.props.colours[ Math.floor(Math.random() * 3)], key: i})
    }
  }

  render() {
    return(
      <div className='background-container'>
        {this.blocks.map( block => <Block key={block.key} colours={block.colours} mouseMovement={this.props.mouseMovement}/>)}
      </div>
    )
  }
}