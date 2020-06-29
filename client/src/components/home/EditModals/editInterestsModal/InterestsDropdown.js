import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { useSocket } from '../../../../hooks/useSocket';

export const InterestsDropdown = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const isDropDownOpen = useSelector(state => state.home.interestsDropdown);
  const selectedInterests = useSelector(state => state.home.selectedInterests);
  const interests = useSelector(state => state.home.interests);
  const interestOptions = useSelector(state => state.home.interestOptions);
  const selectedLength = selectedInterests.length + interests.length;

  const handleChange = (e, { value }) =>
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'selectedInterests', value: value});
  

  const createDropDownObj = (interestArr) =>
    interestArr.map(interest => {return {key: interest.id, id: interest.id, value: interest.name, text: interest.name}})

  useEffect(() => {
    openDropdown('closed');
  }, [selectedInterests]);


  useEffect(() => {
    socket.emit('get-all-interests')
    .on('get-all-interests', (res) => {
      const newRes = createDropDownObj(res)
      dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'interestOptions', value: newRes})
    });
  }, []);
    
  
  const handleAddition = (e, { value }) => {
    dispatch({
      type: 'UPDATE_NESTED_STATE',
      state: 'home',
      nestedState: 'interestOptions',
      value: [{ key: value, text: value, value}, ...interestOptions ]
    });
  };

  const openDropdown = (openOrClosed) => {
    if(selectedLength > 9) openOrClosed = 'closed';
    dispatch({
      type: 'UPDATE_NESTED_STATE',
      state: 'home',
      nestedState: 'interestsDropdown',
      value: openOrClosed
    });
  };

  return (
    <Dropdown
      onBlur={() => openDropdown('closed')}
      onFocus={() => openDropdown('open')}
      onClick={() => openDropdown('open')}
      options={interestOptions}
      value={selectedInterests}
      placeholder='Search for or create new interests, just click here and start typing'
      search
      selection
      fluid
      multiple
      allowAdditions
      onAddItem={handleAddition}
      onChange={handleChange}
      open={isDropDownOpen === 'open'}
    />
  );
};