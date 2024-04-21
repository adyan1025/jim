import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './BodyReader.module.css';

function BottomBar() {
  const [bottomMessage, setBottomMessage] = useState("");

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = axios.get("http://127.0.0.1:8080/congratulate");
        setBottomMessage(response.data.bottom_message);
      } catch (error) {
        console.error('Error congratulating:', error);
      }
    };

    fetchData();
    
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={style['bottom-bar']}>
        <p>{bottomMessage}</p>
    </div>
  );
}

export default BottomBar;
