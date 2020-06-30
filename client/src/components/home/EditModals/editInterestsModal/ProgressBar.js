import React, { useEffect, useState } from 'react';
import { Progress, Container, Header, Icon } from 'semantic-ui-react';
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
    <Container>
      <Progress
        value={progress}
        total={5}
        indicating
        size='medium'
        id='home-interests-progress'
      />
    </Container>
  );
};