import React, { useEffect, useState } from 'react';
import { Message, Transition } from 'semantic-ui-react';
import history from '../../history';
import { useSocket } from './../../hooks/useSocket';

export const AlertRenderer = (props) => {
    const [isVisible, setVisible] = useState(true);
    const socket = useSocket();
    
    useEffect(() => {
        if (!socket)
            return history.push('/login');
    }, [])

    const closeAlert = () => {
        setVisible(false);
        socket.emit('remove-alert', {id: props.alert.id});
    }

    return (
        <Transition
          animation="drop"
          duration={1000}
          unmountOnHide={true}
          visible={isVisible}
        >
            <Message
                style={{marginTop: 0}}
                color='teal'
                onDismiss={() => closeAlert()}
                header={props.alert.header}
                content={props.alert.content}
            />
        </Transition>
    );
};