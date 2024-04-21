import style from './BodyReader.module.css';
import Message from './Message';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feedback(props) {
    const [allMessages, setAllMessages] = useState(props.message ? [props.message] : []);

    React.useEffect(() => {
        const newMessage = props.message;
        const sendUserMessage = (user) => {
            axios.post("http://127.0.0.1:8080/receive-user-message", user)
                .then(response => {
                    setAllMessages(prevMessages => [...prevMessages, response.data.message]);
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
        }
        if (newMessage) {
            setAllMessages(prevMessages => [...prevMessages, newMessage]);
            sendUserMessage(newMessage);
        }
    }, [props.message]);

    return (
        <div className={style['feedback']}>
            {allMessages.map((message, index) => (
                <Message message={message} index={index} key={index} />
            ))}
        </div>
    );
}

export default Feedback;
