import React, { Component } from 'react';
import Colors from '../Colors'
import Row from './Row'
import ColorContainer from './ColorContainer'
import MainBall from './MainBall'
import CheckerBall from './CheckerBall'

const { RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, WHITE, BLACK, GRAY, LIGHT_GRAY, LIGHTER_GRAY } = Colors

class Board extends Component {
  constructor(props) {
    super(props)

    const codeLen = 4
    const rowLen = 10
    const currIdx = rowLen - 1
    const allowDuplicates = false

    this.state = {
      codeLen,
      rowLen,
      currIdx,
      allowDuplicates,
      mainBalls: this.setBalls(codeLen, rowLen, currIdx, true),
      checkerBalls: this.setBalls(codeLen, rowLen, currIdx, false),
      answerRow: this.setAnswer(codeLen, allowDuplicates),
    }
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

  setAnswer = (codeLen, allowDuplicates) => {
    const answerRow = []
    let colors = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, WHITE, BLACK]

    for (let i = 0; i < codeLen; i++) {
      const randomIdx = Math.floor(Math.random() * colors.length)
      const randomColor = colors[randomIdx]
      answerRow.push(this.createMainBall(i, LIGHTER_GRAY, randomColor, null, true, false))

      if (allowDuplicates) {
        colors = colors.slice(0, randomIdx).concat(colors.slice(randomIdx + 1))
      }
    }

    return answerRow
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

  handleNewGameClick = () => {
    const select = document.getElementById('select')
    const checkbox = document.getElementById('checkbox')

    const codeLen = parseInt(select.value)
    const rowLen = this.state.rowLen
    const currIdx = rowLen - 1
    const allowDuplicates = checkbox.checked

    this.setState({
      codeLen,
      currIdx,
      allowDuplicates,
      mainBalls: this.setBalls(codeLen, rowLen, currIdx, true),
      checkerBalls: this.setBalls(codeLen, rowLen, currIdx, false),
      answerRow: this.setAnswer(codeLen, allowDuplicates)
    })
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

  renderAnswerRow = () => <div className='answer-row'>
    {this.state.answerRow.map(ball => ball)}
  </div>

  setOptions = () => {
    const options = []

    for (let i = 1; i <= 8; i++) {
      options.push(<option key={i}>{i}</option>)
    }

    return options
  }

  render = () => <div className='board'>
    {this.renderAnswerRow()}
    {this.renderRows()}
    <ColorContainer handleColorClick={this.handleColorClick} />
    <div className='info'>
      <span>Code Length</span>
      <select id='select' defaultValue={this.state.codeLen}>
        {this.setOptions()}
      </select>
    </div>
    <div className='info'>
      <span>Allow Duplicates</span>
      <input id='checkbox' type='checkbox'></input>
    </div>
    <div className='button-container'>
      <button onClick={this.handleNewGameClick}>New Game</button>
      <button>Check</button>
    </div>
  </div>
}

export default Board