import React, { Component } from 'react';

const RED = '#ff9e9e'
const ORANGE = '#ffdb94'
const YELLOW = '#fbffb5'
const GREEN = '#baffb8'
const BLUE = '#addeff'
const PURPLE = '#d6bdff'
const WHITE = '#f9f5ff'
const BLACK = '#262626'

export default class Colors extends Component {
  renderColorBalls = () => {
    const COLORS = [[RED, ORANGE, YELLOW, GREEN], [BLUE, PURPLE, WHITE, BLACK]]
    const rows = []

    for (let i = 0; i < COLORS.length; i++) {
      const colorBalls = []

      for (let j = 0; j < COLORS[i].length; j++) {
        colorBalls.push(<div key={i * COLORS.length + j} className='color-ball' style={{ backgroundColor: COLORS[i][j] }} onClick={this.props.handleColorClick} />)
      }

      const row = <div key={i} className='colors-row'>
        {colorBalls.map(ball => ball)}
      </div>

      rows.push(row)
    }

    return rows
  }

  render = () => {
    return (
      <div className='colors-container'>
        {this.renderColorBalls()}
      </div>
    )
  }
}