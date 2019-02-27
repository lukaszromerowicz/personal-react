import React, { memo } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './components/App'
import './style/style.scss'

const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' render={() => <App showBlog={false} />} />
      <Route path='/blog' render={() => <App showBlog={true} />} />
    </Switch>
  </Router>
)

const areEqual = (prevProps, nextProps) => true
const MemoizedRoot = memo(Root, areEqual)

render(<MemoizedRoot />, document.getElementById('app'))