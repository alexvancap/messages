import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const TextEditor = () => {
  const textInput = useSelector(state => state.chat.sendMsgContent)
  const dispatch = useDispatch()
  const [isFocused, setFocused] = useState('')

  const handleKeyPress = (e) => {
    console.log(e.key)
    let pressedKey = e.key
    if(pressedKey === 'Enter')
      pressedKey = '<br />'
    dispatch({type: 'ADD_TO_NESTED_STATE', state: 'chat', nestedState: 'sendMsgContent', value: pressedKey})
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Backspace')
      dispatch({type: 'REMOVE_CHAR_FROM_STRING'})
  }

  const cleanUp = () => {
    window.removeEventListener('keypress', handleKeyPress)
    window.removeEventListener('click', handleClick)
    window.removeEventListener('keydown', handleKeyDown)
  }

  const handleClick = (e) => {
    if(e.target.className !== 'text-editor focused') cleanUp()
  }

  const formClick = () => {
    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)
    setFocused('focused')
  }

  useEffect(() => {
    return cleanUp()
  } ,[])

  return (
    <div className={`text-editor ${isFocused}`}
      dangerouslySetInnerHTML={{__html: textInput}}
      onClick={formClick}
    >
    </div>
  )
}