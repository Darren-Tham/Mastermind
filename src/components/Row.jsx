import React from 'react';

export default function Row(props) {
  return (
    <div className="row">
      {props.mainBalls.map(ball => ball)}
      <div className='checker' style={{ gridTemplateColumns: `repeat(${props.ballsPerRow}, 1fr)` }} >
        {props.checkerBalls.map(ball => ball)}
      </div>
    </div>)
} 
