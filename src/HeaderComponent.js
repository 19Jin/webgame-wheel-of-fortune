import React from 'react';
import wheelImage from './wheel.png';
import './App.css';

const HeaderComponent = () => {
    return (
        <div className='WheelOfFortuneGame'>
            <header>
                <h1>Wheel&nbsp;&nbsp;Of&nbsp;&nbsp;&nbsp;&nbsp;Fortune</h1>
            </header>
            
            <div className='wheel-container'>
                <img src={wheelImage} alt="Wheel of Fortune" />
            </div>
        </div>
    );
};

export default HeaderComponent;