import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import history from './../../../history'
import { useSocket } from './../../../hooks/useSocket'

export const NewMessageForm = () => {
  const dispatch = useDispatch()
  const sendMsgContent = useSelector(state => state.chat.sendMsgContent)
  const currentConv = useSelector(state => state.chat.currentConv)
  const socket = useSocket()
  const userId = useSelector(state => state.user.id)

  const sendMessage = (e) => {
    const targetUserId = currentConv.user_id === userId ? currentConv.user_two_id : currentConv.user_id
    socket.emit('send-message', {content: sendMsgContent, conversationID: currentConv.id, targetUserId: targetUserId, actionUserId: userId})
  }

  const handleTextChange = (e) => {
    dispatch({
      type: 'UPDATE_NESTED_STATE',
      state: 'chat',
      nestedState: 'sendMsgContent',
      value: e.target.value
    })
  }

  useEffect(() => {
    if (!socket) return history.push('/login')
      socket
        .on('send-message', (message) => {
          dispatch({
            type: 'ADD_MESSAGE',
            newMessage: message[0]
          })
          dispatch({
            type: 'UPDATE_NESTED_STATE',
            state: 'chat',
            nestedState: 'sendMsgContent',
            value: ''
          })
        })
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