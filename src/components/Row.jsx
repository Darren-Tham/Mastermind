import React, { Component } from 'react';

class Row extends Component {

  renderChecker = () => {
    const checkerBalls = this.props.checkerBalls.slice()
    const n = this.props.codeLen
    const topRow = []
    const bottomRow = []

    let i = 0
    while (i < Math.ceil(n / 2)) {
      topRow.push(checkerBalls[i++])
    }

    while (i < n) {
      bottomRow.push(checkerBalls[i++])
    }

    return (
      <div className='checker-container'>
        <div className='checker-row'>
          {topRow.map(ball => ball)}
        </div>
        <div className='checker-row'>
          {bottomRow.map(ball => ball)}
        </div>
      </div>
    )
  }

  render = () => {
    return (
      <div className='main-row'>
        {this.props.mainBalls.map(ball => ball)}
        {this.renderChecker()}
      </div>
    )
  }
}

export default Row