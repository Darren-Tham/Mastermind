import React from 'react';

export default function Row(props) {
  return (
    <div className='main-row'>
      {props.mainBalls.map(ball => ball)}
      <div className='checker-container' style={{ gridTemplateColumns: `repeat(${props.ballsPerRow}, 1fr)` }} >
        {props.checkerBalls.map(ball => ball)}
      </div>
    </div>)
} 
