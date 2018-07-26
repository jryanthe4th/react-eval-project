import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Button, Collapse, Container, DropdownItem, DropdownToggle, DropdownMenu, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Row, UncontrolledDropdown } from 'reactstrap'
import PropTypes from 'prop-types'
import logo from './logo.svg'
import './header.scss'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggleNavbar () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <Router>
        <div className='app'>

          <Navbar color='dark' dark expand='md'>
            <NavbarToggler onClick={this.toggleNavbar} />
            <NavbarBrand tag={Link} to='/'>Clear Capital React Eval</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink exact to='/' className='nav-link'>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/about' className='nav-link'>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/topics' className='nav-link'>Topics</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option1
                    </DropdownItem>
                    <DropdownItem>
                      Option2
                    </DropdownItem>
                    <DropdownItem>
                      Option3
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>

          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/topics'>Topics</Link></li>
            </ul>

            <hr />
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/topics' component={Topics} />
          </div>

        </div>
      </Router>
    )
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
      <li><Link to={`${match.url}/components`}>Components!</Link></li>
      <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => (
        <h3>Please select a topic.</h3>
      )}
    />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

Topics.propTypes = {
  match: PropTypes.object
}

Topic.propTypes = {
  match: PropTypes.object
}
