import React, { Component } from 'react';
import Row from './Row'
import Colors from './Colors'
import MainBall from './MainBall'
import CheckerBall from './CheckerBall'

const GRAY = '#797d80'
const LIGHT_GRAY = '#b8bcbf'

export default class Board extends Component {
  constructor(props) {
    super(props)

    const numOfBalls = 4
    const numOfRows = 10
    const currIdx = numOfRows - 1

    this.state = {
      numOfBalls,
      numOfRows,
      currIdx,
      mainBalls: this.setBalls(numOfBalls, numOfRows, currIdx, true),
      checkerBalls: this.setBalls(numOfBalls, numOfRows, currIdx, false)
    }
  }

  handleClick = e => {
    const id = parseInt(e.target.id)
    const mainBalls = this.state.mainBalls.slice()
    const newRow = []

    for (let i = 0; i < this.state.numOfBalls; i++) {
      if (id === i) {
        const currRow = mainBalls[this.state.currIdx]
        const isClicked = currRow[id].props.isClicked
        if (isClicked) {
          newRow.push(this.createMainBall(i, GRAY, false, this.handleClick))
        } else {
          newRow.push(this.createMainBall(i, '#b59848', true, this.handleClick))
        }
      } else {
        newRow.push(this.createMainBall(i, GRAY, false, this.handleClick))
      }
    }

  
    mainBalls[this.state.currIdx] = newRow
    this.setState({ mainBalls })
  }

  createMainBall = (key, color, isClicked, handleClick) => <MainBall key={key} id={key} color={color} isClicked={isClicked} handleClick={handleClick} />

  createCheckerBall = (key, color) => <CheckerBall key={key} color={color} />

  setBalls = (numOfBalls, numOfRows, currIdx, isMainBalls) => {
    const balls = []
    for (let i = 0; i < numOfRows; i++) {
      const currBalls = []
      for (let j = 0; j < numOfBalls; j++) {
        if (isMainBalls) {
          if (i === currIdx) {
            currBalls.push(this.createMainBall(j, GRAY, false, this.handleClick))
          } else {
            currBalls.push(this.createMainBall(j, LIGHT_GRAY, false, null))
          }
        } else {
          if (i === currIdx) {
            currBalls.push(this.createCheckerBall(j, GRAY))
          } else {
            currBalls.push(this.createCheckerBall(j, LIGHT_GRAY))
          }
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
      <div className='board'>
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