import style from './BodyReader.module.css';
import React, { useState, useEffect } from 'react';

function Message(props) {
  const [messageClass, setMessageClass] = useState('');
  const [messageContainerClass, setMessageContainerClass] = useState('');
  useEffect(() => {
    if (props.index % 2 === 0) {
      setMessageClass(style['user-message']);
      setMessageContainerClass(style['user-message-container']);
    } else {
      setMessageClass(style['ai-message']);
      setMessageContainerClass(style['ai-message-container']);
    }
  }, [props.message]);
  
  return (
    <div className={`${messageContainerClass}`}>
      <div className={`${messageClass}`}>
        {props.message}
      </div>
    </div>
  );
}

export default Message;