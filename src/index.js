import React, { memo } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './components/App'
import Background from './components/Background'
import NotFound from './components/NotFound'
import './style/style.scss'

const Root = () => (
  <main>
    <Background/>
    <Router>
      <Switch>
        <Route exact path='/' render={() => <App showBlog={false} />} />
        <Route path='/blog' render={() => <App showBlog={true} />} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </main>
)

const areEqual = (prevProps, nextProps) => true
const MemoizedRoot = memo(Root, areEqual)

render(<MemoizedRoot />, document.getElementById('app'))