import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import { Link } from 'react-router-dom'
import Background from '../Background'
import MediaQuery from 'react-responsive'
import menuIcon from '../../style/hamburger.svg'
import Blog from '../Blog'

const Header = posed.header({
  small: { 
		'transform': ({transform}) => transform,
		'top': '0em',
		'left': 'calc(0% - 0rem)'
  },
  large: { 
		'transform': 'scale(1) skewY(-20deg)',
		'top': '2em',
		'left': ({headerSpacing}) => `calc(100% - ${headerSpacing})`
  }
})

const MainContainer = posed.div({
  navigation: {
    'grid-template-rows' : '200px 400px auto'
  },
  blog: {
    'grid-template-rows' : '50px 200px auto',
  }
})

const Ul = posed.ul({
  enter: { opacity: 1, y: '0' },
  exit: { opacity: 1, y: '-100vh' }
})

const App = ({ showBlog }) => {
  return (
    <MainContainer 
      className='main-container'
      pose={ showBlog ? 'blog' : 'navigation' }
    >
      <Background />
      <div className='header-container'>
        <MediaQuery query="only screen and (max-width: 768px)">
          <Header pose={showBlog ? 'small' : 'large'} transform='scale(0.9) skewY(-20deg)' headerSpacing='10rem'>Łukasz Romerowicz</Header>
        </MediaQuery>
        <MediaQuery query="only screen and (min-width: 768px) and (max-width: 1024px)">
          <Header pose={showBlog ? 'small' : 'large'} transform='scale(0.5) skewY(-20deg)' headerSpacing='25rem'>Łukasz Romerowicz</Header>
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
      {showBlog && <Blog/>}
    </MainContainer>
  )
}

export default App