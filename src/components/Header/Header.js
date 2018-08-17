import './header.scss'

import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'

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
      <div className='header-container'>
        <Navbar color='dark' dark expand='md'>
          <NavbarToggler onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to='/'>Clear Capital React Eval</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink exact to='/' className='nav-link'>Home</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
