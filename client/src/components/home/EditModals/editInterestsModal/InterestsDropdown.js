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
    console.log('change', value)
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'selectedInterests', value: value})
  }

  useEffect(() => {
    selectedInterests.forEach(interest => console.log(interest))
  }, [selectedInterests])
    
  
  const handleAddition = (e, { value }) => {
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'interestOptions', value: [...interestOptions, {text: value, value}]})
    socket.emit()
  }

  return (
    <Dropdown
          options={interestOptions}
          placeholder='Choose Languages'
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