import React from 'react'

const MainBall = props => {
  const content = props.isClicked ? '?' : ''
  const cursor = props.isClickable ? 'pointer' : 'default'

  const style = {
    backgroundColor: props.color,
    cursor: cursor
  }

  return (
    <div id={props.id} className='main-ball' style={style} onClick={props.handleClick}>{content}</div>
  )
}

export default MainBall