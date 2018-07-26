import './home.scss'
// import data from '../../actions/test.json'
import data from '../../actions/user.json'

import React, {Component} from 'react'
import * as d3 from 'd3'

// const dataset = [1, 2, 3, 4, 5, 6]
// const dataset = numbers
// d3.select('body')
//   .selectAll('p')
//   .data(dataset)
//   .enter()
//   .append('p')
//   .text(function (d) { return d })

// API to fetch github followers
const apiGithubFollowers = 'https://api.github.com/users/jdalton/followers'

// Loading data from API when DOM content has been loaded
document.addEventListener('DOMContentLoaded', function (event) {
  fetch(apiGithubFollowers)
    .then(function (response) { return response.json() })
    .then(function (data) {
      const parsedData = parseData(data)
      drawGraph(parsedData)
    })
    .catch(function (err) { console.log(err) })
})

// Parse data into key-value pairs
// @param {object} data Object containing github follower data
function parseData (data) {
  let arr = []
  for (var i in data.login) {
    arr.push({
      login: String(i), // github follower username
      value: +data.login[i]
    })
  }
  return arr
}

// Create a graph using D3
// @param {object} data Object containing github follower data
function drawGraph (data) {
  const svgWidth = 1000
  const svgHeight = 1000
  const margin = { top: 20, right: 20, bottom: 20, left: 20 }
  let width = svgWidth - margin.left - margin.right
  let height = svgHeight - margin.top - margin.bottom

  let svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  let g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
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

// SVG rectangle
// function Rectangle (props) {
//   return <svg width='800' height='600'>
//     <rect width='100' height='200' x='50' y='20' />
//   </svg>
// }

export default class Home extends Component {
  static propTypes = {}

  state = {}

  render () {
    return (
      <div styleName='home'>
        <ul styleName='list'>
          {
            data.map(function (data, index) {
              return (
                <div className='row' key={index}>
                  <Github />
                  <Twitter />
                  {/* <Rectangle /> */}
                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
