import React, { Component } from 'react'
import { render } from 'react-dom'
import Main from './components/Main'
import './style/style.scss' 

const App = () => {
  return (
    <Main>
      <header>Łukasz Romerowicz</header>
      <nav>
        <ul>
          <li><a href="https://uk.linkedin.com/in/łukasz-romerowicz-44212a10a">LinkedIn</a></li>
          <li><a href="https://github.com/lukaszromerowicz">GitHub</a></li>
          <li><a href="mailto:lukaszromerowicz@gmail.com">E-mail</a></li>
        </ul>
      </nav>
    </Main>
  )
}

render(<App/>, document.getElementById('app'))