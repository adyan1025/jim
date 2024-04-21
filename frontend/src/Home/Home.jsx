import React from 'react';
import style from './Home.module.css';
import videoBackground from './bg.mp4';
import { Link } from 'react-router-dom';


function Home() {
    return(
        <div className={style['home-container']}>
            <video autoPlay loop muted>
                <source src={videoBackground} type="video/mp4"/>
            </video>
            <div className={style['content']}>
                <div className={style['title']}>
                    <span>JIM</span>
                </div>
                <div className={style['subtitle']}>
                    <span>to help you at the gym.</span>
                </div>
                <Link to="/dashboard">
                    <button>Begin</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;