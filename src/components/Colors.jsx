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

  handleDragStart = e => e.dataTransfer.setData('color', e.target.id)

  render = () => {
    return (
      <div className='colors-wrapper'>
        <div className='colors-row'>
          <div id='red' className='ball' style={{ backgroundColor: RED }} onDragStart={this.handleDragStart} draggable />
          <div id='orange' className='ball' style={{ backgroundColor: ORANGE }} onDragStart={this.handleDragStart} draggable />
          <div id='yellow' className='ball' style={{ backgroundColor: YELLOW }} onDragStart={this.handleDragStart} draggable />
          <div id='green' className='ball' style={{ backgroundColor: GREEN }} onDragStart={this.handleDragStart} draggable />
        </div>
        <div className='colors-row'>
          <div id='blue' className='ball' style={{ backgroundColor: BLUE }} onDragStart={this.handleDragStart} draggable />
          <div id='purple' className='ball' style={{ backgroundColor: PURPLE }} onDragStart={this.handleDragStart} draggable />
          <div id='white' className='ball' style={{ backgroundColor: WHITE }} onDragStart={this.handleDragStart} draggable />
          <div id='black' className='ball' style={{ backgroundColor: BLACK }} onDragStart={this.handleDragStart} draggable />
        </div>
      </div>
    )
  }
}