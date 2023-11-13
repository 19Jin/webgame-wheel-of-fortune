import React from 'react';

const StartGame = (props) => {

    return (
        <div className="start-container">
            <button onClick={props.startGame}>Start Game</button>
        </div>
    );
}

export default StartGame;
