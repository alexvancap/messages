import React, { useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from './../../../hooks/useSocket'

export const NewMessageForm = () => {
  const dispatch = useDispatch()
  const sendMsgContent = useSelector(state => state.chat.sendMsgContent)
  const currentConv = useSelector(state => state.chat.currentConv)
  const socket = useSocket()

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send-message', {content: sendMsgContent, conversationID: currentConv.id})
  }

  const handleTextChange = (e) => {
    dispatch({
        type: 'UPDATE_NESTED_STATE',
        state: 'chat',
        nestedState: 'sendMsgContent',
        value: e.target.value
    })
  }

  const afterSendSuccess = (message) => {
    dispatch({
      type: 'ADD_MESSAGE',
      newMessage: message
    })
  }

  useEffect(() => {
    socket
    .on('send-message', (res) => afterSendSuccess(...res))
  }, [])

  return (
    <Form id='new-message-form' reply onSubmit={sendMessage}>
    <Form.TextArea 
        onChange={handleTextChange}
        value={sendMsgContent}
        rows={2}
    />
    <Button id='send-message-button'
        color='teal'
        content='send'
        labelPosition='left'
        icon='edit'
        type='submit'
    />
  </Form>
  )
}