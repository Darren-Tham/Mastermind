import React, { Component } from 'react';
import Colors from '../Colors'
import Row from './Row'
import ColorContainer from './ColorContainer'
import MainBall from './MainBall'
import CheckerBall from './CheckerBall'

const { RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, WHITE, BLACK, GRAY, LIGHT_GRAY } = Colors

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
            currBalls.push(this.createMainBall(j, LIGHT_GRAY, LIGHT_GRAY, null, false, false))
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

  setAnswer = (codeLen, allowDuplicates) => {
    const answerRow = []
    let colors = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, WHITE, BLACK]

    for (let i = 0; i < codeLen; i++) {
      const randomIdx = Math.floor(Math.random() * colors.length)
      const randomColor = colors[randomIdx]
      answerRow.push(this.createMainBall(i, LIGHT_GRAY, randomColor, null, true, false))

      if (!allowDuplicates) {
        colors = colors.slice(0, randomIdx).concat(colors.slice(randomIdx + 1))
      }
    }

    return answerRow
  }

  updateRow = () => {    
    const mainBalls = this.state.mainBalls.slice()
    const currIdx = this.state.currIdx
    const nextIdx = currIdx - 1
    const currRow = mainBalls[currIdx]
    const nextRow = []
    const n = this.state.codeLen

    for (let i = 0; i < n; i++) {
      const color = currRow[i].props.color
      currRow[i] = this.createMainBall(i, color, color, null, false, false)
      nextRow.push(this.createMainBall(i, GRAY, GRAY, this.handleMainClick, false, true))
    }

    mainBalls[currIdx] = currRow
    mainBalls[nextIdx] = nextRow

    this.setState({ 
      currIdx: nextIdx,
      mainBalls,
    })
  }

  updateChecker = () => {
    const mainBalls = this.state.mainBalls.slice()
    const checkerBalls = this.state.checkerBalls.slice()
    const currIdx = this.state.currIdx
    const nextIdx = currIdx - 1
    const currRow = mainBalls[currIdx]
    const answerRow = this.state.answerRow.slice()
    const n = this.state.codeLen
    const newChecker = []
    const nextChecker = []

    const currRowHashmap = {}
    const answerRowHashmap = {}

    let keyId = 0
    for (let i = 0; i < n; i++) {
      const currColor = currRow[i].props.mainColor
      const answerColor = answerRow[i].props.mainColor
      if (currColor === answerColor) {
        newChecker.push(this.createCheckerBall(keyId++, RED))
      } else {
        currRowHashmap[currColor] = currRowHashmap[currColor] === undefined ? 1 : currRowHashmap[currColor] + 1
        answerRowHashmap[answerColor] = answerRowHashmap[answerColor] === undefined ? 1 : answerRowHashmap[answerColor] + 1
      }
    }

    for (const mapKey in currRowHashmap) {
      if (answerRowHashmap[mapKey] !== undefined) {
        const min = Math.min(currRowHashmap[mapKey], answerRowHashmap[mapKey])
        for (let i = 0; i < min; i++) {
          newChecker.push(this.createCheckerBall(keyId++, WHITE))
        }
      }
    }

    for (let i = newChecker.length; i < n; i++) {
      newChecker.push(this.createCheckerBall(keyId++, GRAY))
    }

    for (let i = 0; i < n; i++) {
      nextChecker.push(this.createCheckerBall(i, GRAY))
    }

    checkerBalls[currIdx] = newChecker
    checkerBalls[nextIdx] = nextChecker
    this.setState({ checkerBalls })
  }

  handleMainClick = e => {
    const id = parseInt(e.target.id)
    const mainBalls = this.state.mainBalls.slice()
    const currIdx = this.state.currIdx
    const currRow = mainBalls[currIdx]
    const isClicked = currRow[id].props.isClicked

    const newRow = currRow.map((ball, i) => {
      const mainColor = ball.props.mainColor
      if (id === i && !isClicked) {
        return this.createMainBall(i, LIGHT_GRAY, mainColor, this.handleMainClick, true, true)
      } else {
        return this.createMainBall(i, mainColor, mainColor, this.handleMainClick, false, true)
      }
    })

    mainBalls[currIdx] = newRow
    this.setState({ mainBalls })
  }

  handleColorClick = e => {
    const color = e.target.style.backgroundColor
    const mainBalls = this.state.mainBalls.slice()
    const currIdx = this.state.currIdx
    const currRow = mainBalls[currIdx]

    currRow.forEach((ball, i) => {
      if (ball.props.isClicked) {
        currRow[i] = this.createMainBall(i, color, color, this.handleMainClick, false, true)
      }
    })

    mainBalls[currIdx] = currRow
    this.setState({ mainBalls })
  }

  handleNewGame = _ => {
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

  handleCheck = _ => {
    const mainBalls = this.state.mainBalls.slice()
    const currIdx = this.state.currIdx
    const currRow = mainBalls[currIdx]
    const codeLen = this.state.codeLen

    for (let i = 0; i < codeLen; i++) {
      const currColor = currRow[i].props.color
      if (currColor === LIGHT_GRAY) {
        alert('Make sure there are no balls with question marks!')
        return
      } else if (currColor === GRAY) {
        alert('Make sure the row is filled!')
        return
      }
    }

    this.updateChecker()
    this.updateRow()
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
      <button onClick={this.handleNewGame}>New Game</button>
      <button onClick={this.handleCheck}>Check</button>
    </div>
  </div>
}

export default Board