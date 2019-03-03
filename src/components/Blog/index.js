import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PostsList from '../PostsList'
import Post from '../Post'
import { importAll } from '../../util'

importAll(require.context(`../../posts`, false, /\.png$/))
const Blog = () => {
    return <div className="blog">
        <Switch>
            <Route exact path='/blog' component={PostsList} />
            <Route path='/blog/:slug' component={Post} />
        </Switch>
      </div>
}

export default Blog