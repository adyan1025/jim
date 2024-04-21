import React, { useState } from 'react';
import style from './BodyReader.module.css';

function PromptBar({ onSave }) {
  const [inputValue, setInputValue] = useState('');

  const saveResponse = () => {
    console.log('Response saved:', inputValue);
    // Call the onSave callback function provided by the parent component
    if (onSave) {
      onSave(inputValue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveResponse();
      setInputValue('');
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input 
      type="text" 
      placeholder="Ask Jim..." 
      className={style['prompt']} 
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}>
    </input>
  );
}

export default PromptBar;