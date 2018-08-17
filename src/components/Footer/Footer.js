import './footer.scss'
import data from '../../actions/user.json'

import React, { Component } from 'react'

export default class Footer extends Component {
  render () {
    return (
      <footer>
        <ul styleName='list'>
          <Github />
          <Twitter />
        </ul>
      </footer>
    )
  }
}

// Link to github account
function Github (props) {
  return <a target='_blank' id='github' href='https://github.com/jdalton'>
    <li className='fa fa-github' key={data.html_url} />
  </a>
}

// Link to twitter account
function Twitter (props) {
  return <a target='_blank' id='twitter' href='http://twitter.com/jdalton'>
    <li className='fa fa-twitter' key={data.blog} />
  </a>
}
