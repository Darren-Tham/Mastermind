import React, { Component } from 'react';
import Colors from '../Colors'

const { RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, WHITE, BLACK } = Colors

class ColorContainer extends Component {
  renderColorBalls = () => {
    const colors = [[RED, ORANGE, YELLOW, GREEN], [BLUE, PURPLE, WHITE, BLACK]]
    const rows = []

    for (let i = 0; i < colors.length; i++) {
      const colorBalls = []

      for (let j = 0; j < colors[i].length; j++) {
        colorBalls.push(<div key={i * colors.length + j} className='color-ball' style={{ backgroundColor: colors[i][j] }} onClick={this.props.handleColorClick} />)
      }

      const row = <div key={i} className='color-row'>
        {colorBalls.map(ball => ball)}
      </div>

      rows.push(row)
    }

    return rows
  }

  render = () => <div className='color-container'>
    {this.renderColorBalls()}
  </div>
}

export default ColorContainer