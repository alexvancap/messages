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
        total={10}
        indicating
        size='small'
        style={{width: '99%', margin: '0 auto'}}
      />
    </Container>
  );
};