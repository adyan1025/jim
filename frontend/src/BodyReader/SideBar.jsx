import React, { useState } from 'react';
import style from './BodyReader.module.css';
import Feedback from './Feedback';
import PromptBar from './PromptBar';

function SideBar() {
  const [response, setResponse] = useState(null);

  const handleSaveResponse = (newResponse) => {
    setResponse(newResponse); // Update state with received response
  };

  return (
    <div className={style['side-bar']}>
      <Feedback message={response} /> {/* Conditionally render Feedback */}
      <div className={style['side-prompt']}>
        <PromptBar onSave={handleSaveResponse} />
      </div>
    </div>
  );
}

export default SideBar;
