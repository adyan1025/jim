import style from './BodyReader.module.css';
import Message from './Message';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Feedback(props) {
    const [messages, setMessages] = useState(props.message ? [props.message] : []);
    const [geminiMessages, setGeminiMessages] = useState([]);

    React.useEffect(() => {
        const newMessage = props.message;
        const fetchAPI = () => {
            axios.get("http://127.0.0.1:8080/gemini-message")
                .then(response => {
                    setGeminiMessages(prevGeminiMessages => [...prevGeminiMessages, response.data.message]);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        if (newMessage) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          fetchAPI();
        }
    }, [props.message]);

    
    
    return (
        <div className={style['feedback']}>
            {messages.map((message, index) => (
                <Message message={message} key={index} />
            ))}
            {geminiMessages.map((message, index) => (
                <Message message={message} key={index} />
            ))}
        </div>
    );
}

export default Feedback;
