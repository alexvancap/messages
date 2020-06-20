import React, { useRef, useEffect } from 'react'
import { Message } from './Message'
import { useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'

export const MessagesContainer = () => {
  const messages = useSelector(state => state.chat.messages)
  const scrollToBtmRef = useRef()

  const scrollToBottom = () => scrollToBtmRef.current.scrollIntoView({ behavior: "auto" });

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Container 
      id='messages-content' 
      style={messages.length <= 4 ? {display: 'block'} : {}}>
      {
        messages.map(message => 
          <Message key={message.id} message={message} />
        )
      }
      <div ref={scrollToBtmRef} />
    </Container>
  )
}