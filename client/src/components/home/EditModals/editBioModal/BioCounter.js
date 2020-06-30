import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';

export const BioCounter = () => {
  const bio = useSelector(state => state.user.bio);
  const [progress, setProgress] = useState(0);
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setProgress(bio.length)
    if(progress > 140) setDisabled(true)
  }, [bio])
  return (
    <Header 
      inverted 
      disabled={disabled} 
      as='h3' 
      style={{textAlign: 'center', color: bio.length === 140 ? 'red' : ''}}
    >
      {progress}/140
    </Header>
  );
};