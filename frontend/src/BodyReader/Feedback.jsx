import style from './BodyReader.module.css';
import Message from './Message';
import React, { useState } from 'react';


function Feedback(props) {
    const [messages, setMessages] = useState(props.message ? [props.message] : []);
    React.useEffect(() => {
        const newMessage = props.message;
        if (newMessage) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      }, [props.message]);
    
    return (
        <div className={style['feedback']}>
            {messages.map((message, index) => (
                <Message message={message} key={index} />
            ))}
        </div>
    );
}

export default Feedback;
