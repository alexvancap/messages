import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export const Counter = (props) => {
  return (
    <Header 
      as='h4' 
      style={{textAlign: 'center', height: '15px'}} 
      color={props.progress === 5 ? 'green' : 'teal'}
      inverted
    >
      {props.progress}/5
      {props.progress === 5
        ? <Icon name='check circle' size='tiny' style={{marginLeft: '3px'}}/> 
        : null
      }
    </Header>
  )
}