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

  render = () => {
    return (
      <div className='colors-wrapper'>
        <div className='colors-row'>
          <div id='red' className='ball' style={{ backgroundColor: RED }} />
          <div id='orange' className='ball' style={{ backgroundColor: ORANGE }} />
          <div id='yellow' className='ball' style={{ backgroundColor: YELLOW }} />
          <div id='green' className='ball' style={{ backgroundColor: GREEN }} />
        </div>
        <div className='colors-row'>
          <div id='blue' className='ball' style={{ backgroundColor: BLUE }} />
          <div id='purple' className='ball' style={{ backgroundColor: PURPLE }} />
          <div id='white' className='ball' style={{ backgroundColor: WHITE }} />
          <div id='black' className='ball' style={{ backgroundColor: BLACK }} />
        </div>
      </div>
    )
  }
}