import React, { Component } from 'react';
import Row from './Row'
import Colors from './Colors'
import MainBall from './MainBall'
import CheckerBall from './CheckerBall'

export default class Container extends Component {
  constructor(props) {
    super(props)

    const numOfBalls = 4
    const numOfRows = 10

    this.state = {
      numOfBalls,
      numOfRows,
      mainBalls: this.setBalls(numOfBalls, numOfRows, true),
      checkerBalls: this.setBalls(numOfBalls, numOfRows, false)
    }
  }

  setBalls = (numOfBalls, numOfRows, isMainBalls) => {
    const balls = []

    for (let i = 0; i < numOfRows; i++) {
      const currBalls = []
      for (let j = 0; j < numOfBalls; j++) {
        if (isMainBalls) {
          currBalls.push(<MainBall key={i * numOfBalls + j} color='#81878c' isClicked={false} />)
        } else {
          currBalls.push(<CheckerBall key={i * numOfBalls + j} color='#81878c' />)
        }
      }
      balls.push(currBalls)
    }

    return balls
  }

  renderRows = () => {
    const rows = []
    for (let i = 0; i < this.state.numOfRows; i++) {
      rows.push(<Row key={i} mainBalls={this.state.mainBalls[i]} checkerBalls={this.state.checkerBalls[i]} ballsPerRow={this.state.numOfBalls / 2} />)
    }
    return rows
  }

  render = () => {
    return (
      <div className='container'>
        {this.renderRows().map(row => row)}
        <Colors />
        <div className='buttons-wrapper'>
          <button>New Game</button>
          <button>Check</button>
        </div>
      </div>
    )
  }
}