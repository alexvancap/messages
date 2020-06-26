import React, { useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../../../../hooks/useSocket'

export const InterestsDropdown = () => {
  const dispatch = useDispatch()
  const socket = useSocket()

  const interestOptions = useSelector(state => state.home.interestOptions)
  const selectedInterests = useSelector(state => state.home.selectedInterests)

  const handleChange = (e, { value }) => {
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'selectedInterests', value: value})
  }

  useEffect(() => {
    socket.emit('get-all-interests')
    .on('get-all-interests', (res) => {
      console.log(res)
    })
  }, [])
    
  
  const handleAddition = (e, { value }) => {
    console.log([{ text: value, value}, ...interestOptions ])
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'interestOptions', value: [{ key: value, text: value, value}, ...interestOptions ]})
    socket.emit()
  }

  return (
    <Dropdown
      options={interestOptions}
      placeholder='Search for or create new interests, just click here and start typing'
      search
      selection
      fluid
      multiple
      allowAdditions
      value={selectedInterests}
      onAddItem={handleAddition}
      onChange={handleChange}
    />
  )
}