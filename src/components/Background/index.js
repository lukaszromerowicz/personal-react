import React from 'react'
import withWindowEventBus from '../WithWindowEventBus'
import Block from './Block'

export default withWindowEventBus(({ windowEventBus} ) => (
  [...Array(10).keys()].map( block => <Block key={block.key} windowEventBus={windowEventBus} />)
))