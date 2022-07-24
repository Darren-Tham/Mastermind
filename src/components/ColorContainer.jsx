import React, { Component } from 'react';
import Colors from '../Colors'

class ColorContainer extends Component {
  renderColorBalls = () => {
    const { RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, WHITE, BLACK } = Colors
    const COLORS = [[RED, ORANGE, YELLOW, GREEN], [BLUE, PURPLE, WHITE, BLACK]]
    const rows = []

    for (let i = 0; i < COLORS.length; i++) {
      const colorBalls = []

      for (let j = 0; j < COLORS[i].length; j++) {
        colorBalls.push(<div key={i * COLORS.length + j} className='color-ball' style={{ backgroundColor: COLORS[i][j] }} onClick={this.props.handleColorClick} />)
      }

      const row = <div key={i} className='color-row'>
        {colorBalls.map(ball => ball)}
      </div>

      rows.push(row)
    }

    return rows
  }

  render = () => {
    return (
      <div className='color-container'>
        {this.renderColorBalls()}
      </div>
    )
  }
}

export default ColorContainer