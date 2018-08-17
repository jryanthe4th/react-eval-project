import './homepage.scss'
// import data from '../../actions/test.json'
// import data from '../../actions/user.json'

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
const apiBitcoinPriceIndex = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-10-31&end=2018-07-01'

// Loading data from API when DOM content has been loaded
document.addEventListener('DOMContentLoaded', function (event) {
  const apiGithub = fetch(apiGithubFollowers)
    .then(function (response) { return response.json() })

  const apiBitcoin = fetch(apiBitcoinPriceIndex)
    .then(function (response) { return response.json() })
    // .then(function (data) {
    //   const parsedData = parseData(data)
    //   listData(parsedData)
    // })
    .then(function (data) {
      const parsedData = parseData(data)
      drawChart(parsedData)
    })
    .catch(function (err) { console.log(err) })

  // const combinedData = {'apiGithub':{},'apiBitcoin':{}}
  // Promise.all([apiGithub,apiBitcoin])
  //   .then(function (values) {
  //     combinedData['apiGithub'] = values[0]
  //     combinedData['apiBitcoin'] = values[1]
  //     return combinedData
  //   })
})

// Parse data into key-value pairs
// @param {object} data Object containing github follower data
// function parseData (data) {
//   let arr = []
//   for (var i in data.followers) {
//     arr.push({
//       followers: String(i), // github follower username
//       value: +data.followers[i]
//     })
//   }
//   return arr
// }

function parseData (data) {
  let arr = []
  for (var i in data.bpi) {
    arr.push({
      date: new Date(i),
      value: +data.bpi[i]
    })
  }
  return arr
}

// Create a graph using D3
// @param {object} data Object containing github follower data
// function listData (data) {
//   return (data.map(data =>
//     (
//       <tr key={data.index}>
//         <td>{(data.login)}</td>
//       </tr>
//     )
//   )

//   )
// }

// SVG rectangle
// function Rectangle (props) {
//   return <svg width='800' height='600'>
//     <rect width='100' height='200' x='50' y='20' />
//   </svg>
// }

function drawChart (data) {
  const svgWidth = 1000
  const svgHeight = 500
  const margin = { top: 20, right: 20, bottom: 30, left: 50 }
  const width = svgWidth - margin.left - margin.right
  const height = svgHeight - margin.top - margin.bottom

  const svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const x = d3.scaleTime()
    .rangeRound([0, width])

  const y = d3.scaleLinear()
    .rangeRound([height, 0])

  const line = d3.line()
    .x(function (d) { return x(d.date) })
    .y(function (d) { return y(d.value) })
  x.domain(d3.extent(data, function (d) { return d.date }))
  y.domain(d3.extent(data, function (d) { return d.value }))

  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
    .select('.domain')
    .remove()

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Price ($)')

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line)
}

export default class HomePage extends Component {
  static propTypes = {}

  state = {}

  render () {
    return (
      <div styleName='homepage'>
        <h1>Homepage</h1>
        <svg className='line-chart'></svg>
      </div>
    )
  }
}
