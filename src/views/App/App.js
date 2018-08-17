import './app.scss'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import Header from 'components/Header'
import HomePage from 'components/Home'
import Footer from 'components/Footer'

import {getUser} from 'actions/userActions'
import {getRepos} from 'actions/reposActions'
import {getEvents} from 'actions/eventsActions'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => (bindActionCreators({
  getEvents,
  getRepos,
  getUser
}, dispatch))

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    getEvents: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {getUser, getRepos, getEvents} = this.props

    getUser()
    getRepos()
    getEvents()
  }
  render () {
    return (
      <div styleName='App'>
        <div className='header-container'>
          <Header />
        </div>
        <div className='content-container'>
          <HomePage />
        </div>
        <div className='footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}
