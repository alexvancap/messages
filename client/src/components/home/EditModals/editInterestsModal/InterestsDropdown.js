import React, { useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../../../../hooks/useSocket'

export const InterestsDropdown = () => {
  const dispatch = useDispatch()
  const socket = useSocket()

  const interestOptions = useSelector(state => state.home.interestOptions)

  const handleChange = (e, { value }) => {
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'selectedInterests', value: value})
  }

  useEffect(() => {
    socket.emit('get-all-interests')
    .on('get-all-interests', (res) => {
      const newRes = res.map(interest => {return {key: interest.id, id: interest.id, value: interest.name, text: interest.name}})
      dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'interestOptions', value: newRes})
    })
  }, [])
    
  
  const handleAddition = (e, { value }) => {
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
      onAddItem={handleAddition}
      onChange={handleChange}
    />
  )
}