import React from 'react'

export default function MainBall(props) {
  return (
    <button className='ball' style={{ backgroundColor: props.color }}></button>
  )
}