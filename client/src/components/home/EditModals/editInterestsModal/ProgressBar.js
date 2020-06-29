import React, { useEffect, useState } from 'react';
import { Progress } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

export const ProgressBar = () => {
  const selectedInterests = useSelector(state => state.home.selectedInterests);
  const interests = useSelector(state => state.home.interests)
  const [progress, setProgress] = useState(0);

  const getSelectedLength = () =>
    selectedInterests.length + interests.length;

  useEffect(() => {
    setProgress(getSelectedLength())
    }, [selectedInterests, interests]
  );
  
  return (
    <Progress
      value={progress}
      total={10}
      attached='top' 
      indicating
      style={{width: '99%', margin: '0 auto'}}
    />
  );
};