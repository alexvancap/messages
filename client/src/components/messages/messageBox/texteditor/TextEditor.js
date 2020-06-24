import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const TextEditor = () => {
  const textInput = useSelector(state => state.chat.sendMsgContent)
  const dispatch = useDispatch()
  const [ isFocused, setFocused ] = useState('')

  const handleKeyPress = (e) => {
    let pressedKey = e.key
    if(pressedKey === 'Enter')
      pressedKey = '<br />'
    dispatch({type: 'ADD_TO_NESTED_STATE', state: 'chat', nestedState: 'sendMsgContent', value: pressedKey})
  }

  const handleKeyDown = (e) => {
    console.log('key pressed')
    if(e.key === 'Backspace')
      dispatch({type: 'REMOVE_CHAR_FROM_STRING'})
  }

  const cleanUp = () => {
    window.removeEventListener('keypress', handleKeyPress)
    window.removeEventListener('click', handleClick)
    window.removeEventListener('keydown', handleKeyDown)
  }

  const handleClick = (e) => {
    const className = e.target.className
    if (!(className.includes('text-editor') || className.includes('text-editor-p'))) {
      setFocused('')
      cleanUp()
    }
  }

  const formClick = (e) => {
    if(isFocused === ''){
      window.addEventListener('keypress', handleKeyPress)
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('click', handleClick)
      setFocused('focused')
    }
  }

  useEffect(() => {
    setInterval(() => {
      console.log(window.getSelection())
    }, 10000)

    return cleanUp
  } ,[])

  if (isFocused === '' && textInput === '')
    return (
      <div 
        className='text-editor tutorial'
        onClick={formClick} >
        <p className='text-editor-p'>click here and start typing to write a message</p>
      </div>
    )

  return (
    <div 
      className={`text-editor ${isFocused}`}
      onClick={formClick}
    >
      <p dangerouslySetInnerHTML={{__html: textInput}}
      className='text-editor-p'></p>
    </div>
  )
}