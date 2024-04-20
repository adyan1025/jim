import React, { useState } from 'react';
import style from './BodyReader.module.css';

function PromptBar() {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        // Save the response when Enter key is pressed
        saveResponse(inputValue);
        // Clear the input field
        setInputValue('');
        }
    };

    const saveResponse = (response) => {
        // Perform any action to save the response here
        console.log('Response saved:', response);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
  return (
    <input 
    type="text" 
    placeholder="Enter Prompt" 
    className={style['prompt']} 
    value={inputValue}
    onChange={handleChange}
    onKeyDown={handleKeyDown}>
    </input>
  );
}

export default PromptBar;
