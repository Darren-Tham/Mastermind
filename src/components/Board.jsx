import React, { Component } from 'react';
import Row from './Row'
import Colors from './Colors'
import MainBall from './MainBall'
import CheckerBall from './CheckerBall'

const GRAY = '#797d80'
const LIGHT_GRAY = '#989c9e'
const LIGHTER_GRAY = '#b8bcbf'

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

  handleMainClick = e => {
    const id = parseInt(e.target.id)
    const mainBalls = this.state.mainBalls.slice()
    const currRow = mainBalls[this.state.currIdx]
    const isClicked = currRow[id].props.isClicked

    const newRow = currRow.map((ball, i) => {
      const mainColor = ball.props.mainColor
      if (id === i && !isClicked) {
        return this.createMainBall(i, LIGHT_GRAY, mainColor, this.handleMainClick, true, true)
      } else {
        return this.createMainBall(i, mainColor, mainColor, this.handleMainClick, false, true)
      }
    })

    mainBalls[this.state.currIdx] = newRow
    this.setState({ mainBalls })
  }

  handleColorClick = e => {
    const color = e.target.style.backgroundColor
    const mainBalls = this.state.mainBalls.slice()
    const currRow = mainBalls[this.state.currIdx]

    currRow.forEach((ball, i) => {
      if (ball.props.isClicked) {
        currRow[i] = this.createMainBall(i, color, color, this.handleMainClick, false, true)
      }
    })

    mainBalls[this.state.currIdx] = currRow
    this.setState({ mainBalls })
  }

  createMainBall = (key, color, mainColor, handleClick, isClicked, isClickable) => <MainBall key={key} id={key} color={color} mainColor={mainColor} handleClick={handleClick} isClicked={isClicked} isClickable={isClickable} />

  createCheckerBall = (key, color) => <CheckerBall key={key} color={color} />

  setBalls = (numOfBalls, numOfRows, currIdx, isMainBalls) => {
    const balls = []

    for (let i = 0; i < numOfRows; i++) {
      const currBalls = []

      for (let j = 0; j < numOfBalls; j++) {
        if (isMainBalls) {
          if (i === currIdx) {
            currBalls.push(this.createMainBall(j, GRAY, GRAY, this.handleMainClick, false, true))
          } else {
            currBalls.push(this.createMainBall(j, LIGHTER_GRAY, LIGHTER_GRAY, null, false, false))
          }
        } else {
          if (i === currIdx) {
            currBalls.push(this.createCheckerBall(j, GRAY))
          } else {
            currBalls.push(this.createCheckerBall(j, LIGHTER_GRAY))
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
      rows.push(<Row key={i} mainBalls={this.state.mainBalls[i]} checkerBalls={this.state.checkerBalls[i]} numOfBalls={this.state.numOfBalls} />)
    }

    return (
      <div>
        {rows.map(row => row)}
      </div>
    )
  }

  renderAnswerRow = () => {
    const balls = []

    for (let i = 0; i < this.state.numOfBalls; i++) {
      balls.push(this.createMainBall(i, LIGHTER_GRAY, LIGHTER_GRAY, null, true, false))
    }

    return (
      <div className='answer-row'>
        {balls.map(ball => ball)}
      </div>
    )
  }

  render = () => {
    return (
      <div className='board'>
        {this.renderAnswerRow()}
        {this.renderRows()}
        <Colors handleColorClick={this.handleColorClick} />
        <div className='buttons-wrapper'>
          <button>New Game</button>
          <button>Check</button>
        </div>
      </div>
    )
  }
}