import React, { useState } from 'react';
import style from './BodyReader.module.css';
import Feedback from './Feedback';
import PromptBar from './PromptBar';

function SideBar() {
  const [response, setResponse] = useState(null);

  const handleSaveResponse = (newResponse) => {
    setResponse(newResponse);
  };

  return (
    <div className={style['side-bar']}>
      <Feedback message={response} />
      <div className={style['side-prompt']}>
        <PromptBar onSave={handleSaveResponse} />
      </div>
    </div>
  );
}

export default SideBar;
