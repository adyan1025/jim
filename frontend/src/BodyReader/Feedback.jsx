import style from './BodyReader.module.css';
import Message from './Message';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Feedback(props) {
    const [array, setArray] = useState([]);
    const fetchAPI = async () => {
        const response = await axios.get("http://127.0.0.1:8080/gemini-message");
        setArray(response.data.message);
    }
    useEffect(() => {
    fetchAPI()
    }, []);

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
            {array.map((message, index) => (
                <div key={index}>
                    <span>{message}</span>
                    <br></br>
                </div>
            ))}
        </div>
    );
}

export default Feedback;
