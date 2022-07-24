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

    const codeLen = 4
    const rowLen = 10
    const currIdx = rowLen - 1

    this.state = {
      codeLen,
      rowLen,
      currIdx,
      mainBalls: this.setBalls(codeLen, rowLen, currIdx, true),
      checkerBalls: this.setBalls(codeLen, rowLen, currIdx, false)
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

  handleNewGameClick = e => {
    const select = document.getElementById('select')
    const codeLen = parseInt(select.value)
    const rowLen = this.state.rowLen
    const currIdx = rowLen - 1

    this.setState({
      codeLen,
      currIdx,
      mainBalls: this.setBalls(codeLen, rowLen, currIdx, true),
      checkerBalls: this.setBalls(codeLen, rowLen, currIdx, false)
    })
  }

  createMainBall = (key, color, mainColor, handleClick, isClicked, isClickable) => <MainBall key={key} id={key} color={color} mainColor={mainColor} handleClick={handleClick} isClicked={isClicked} isClickable={isClickable} />

  createCheckerBall = (key, color) => <CheckerBall key={key} color={color} />

  setBalls = (codeLen, rowLen, currIdx, isMainBalls) => {
    const balls = []

    for (let i = 0; i < rowLen; i++) {
      const currBalls = []

      for (let j = 0; j < codeLen; j++) {
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

    for (let i = 0; i < this.state.rowLen; i++) {
      rows.push(<Row key={i} mainBalls={this.state.mainBalls[i]} checkerBalls={this.state.checkerBalls[i]} codeLen={this.state.codeLen} />)
    }

    return (
      <div className='main-container'>
        {rows.map(row => row)}
      </div>
    )
  }

  renderAnswerRow = () => {
    const balls = []

    for (let i = 0; i < this.state.codeLen; i++) {
      balls.push(this.createMainBall(i, LIGHTER_GRAY, LIGHTER_GRAY, null, true, false))
    }

    return (
      <div className='answer-row'>
        {balls.map(ball => ball)}
      </div>
    )
  }

  setOptions = () => {
    const options = []

    for (let i = 1; i <= 10; i++) {
      options.push(<option key={i}>{i}</option>)
    }

    return options
  }

  render = () => {
    return (
      <div className='board'>
        {this.renderAnswerRow()}
        {this.renderRows()}
        <Colors handleColorClick={this.handleColorClick} />
        <div className='info'>
          <span>Code Length</span>
          <select id='select' defaultValue={this.state.codeLen}>
            {this.setOptions()}
          </select>
        </div>
        <div className='info'>
          <span>Allow Duplicate</span>
          <input type='checkbox'></input>
        </div>
        <div className='buttons-wrapper'>
          <button onClick={this.handleNewGameClick}>New Game</button>
          <button>Check</button>
        </div>
      </div>
    )
  }
}