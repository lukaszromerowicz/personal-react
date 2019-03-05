import React, { Fragment } from 'react'
import posed, { PoseGroup } from 'react-pose'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import menuIcon from '../../style/hamburger.svg'
import Blog from '../Blog'

const Header = posed.header({
  small: {
    'transform': ({ transform }) => transform,
    'left': 'calc(0% - 0rem)'
  },
  large: {
    'transform': 'scale(1) skewY(-20deg)',
    'left': ({ headerSpacing }) => `calc(100% - ${headerSpacing})`
  }
})

const HeaderContainer = posed.div({
  blog: {
    marginTop: '-75px',
    height: '250px'
  },
  navigation: {
    marginTop: '0px',
    height: '80vh'
  }
})

const Ul = posed.ul({
  enter: { opacity: 1, y: '0' },
  exit: { opacity: 1, y: '-100vh' }
})

const App = ({ showBlog }) => {
  return (
    <Fragment>
      <HeaderContainer className='header-container' pose={showBlog ? 'blog' : 'navigation'}>
        <div className='heading-container'>
          <MediaQuery query="only screen and (max-width: 767px)">
            <Header pose={showBlog ? 'small' : 'large'} transform='scale(0.9) skewY(-20deg)' headerSpacing='8.75rem'>Łukasz Romerowicz</Header>
          </MediaQuery>
          <MediaQuery query="only screen and (min-width: 768px) and (max-width: 1024px)">
            <Header pose={showBlog ? 'small' : 'large'} transform='scale(0.5) skewY(-20deg)' headerSpacing='23rem'>Łukasz Romerowicz</Header>
          </MediaQuery>
          <MediaQuery query="only screen and (min-width: 1025px)">
            <Header pose={showBlog ? 'small' : 'large'} transform='scale(0.5) skewY(-20deg)' headerSpacing='32.5rem'>Łukasz Romerowicz</Header>
          </MediaQuery>
        </div>
        <nav>
          <Link
            to='/'
            className={showBlog ? 'icon' : 'hidden'}
            dangerouslySetInnerHTML={{ __html: menuIcon }}
          />
          <PoseGroup>
            {!showBlog &&
              [<Ul key='ul'>
                <li><a href="https://uk.linkedin.com/in/łukasz-romerowicz-44212a10a">LinkedIn</a></li>
                <li><a href="https://github.com/lukaszromerowicz">GitHub</a></li>
                <li><a href="mailto:lukaszromerowicz@gmail.com">E-mail</a></li>
                <li><Link to='/blog'>Blog</Link></li>
              </Ul>]}
          </PoseGroup>
        </nav>
      </HeaderContainer>
      {showBlog && <Blog />}
    </Fragment>
  )
}

export default App