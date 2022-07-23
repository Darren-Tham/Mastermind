import React from 'react'

export default function MainBall(props) {
  return (
    <div id={props.id} className='ball' style={{ backgroundColor: props.color }} onClick={props.handleClick} />
  )
}