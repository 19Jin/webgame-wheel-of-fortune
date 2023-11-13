import React from 'react';

const Game = (props) => {
    

    return (
        <>
        <div className="phrase-display">The phrase is: {props.phrase}</div>
        <div className="hidden-phrase-display">Hidden Phrase: {props.hiddenPhrase}</div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter  a  letter"
            value={props.userGuess}
            onChange={(e) => props.setUserGuess(e.target.value)}
          />
          <button onClick={props.handleGuess} >Guess</button>
          <button onClick={props.purchaseExtraGuesses}>Purchase 3 Extra Guesses</button>
        </div>
        <div className="scoreboard">
          <p>Score: {props.score}</p>
          <p>Number of Guesses Allowed: {props.numOfGuessesAllowed}</p>
          <p>Number of Incorrect Guesses: {props.numOfIncorrect}</p>
          <p>Number of Guesses Remaining: {props.numOfGuessesAllowed - props.numOfGuess}</p>
        </div>
        {props.gameOver && (
          <div className="game-over-message">
            {props.hiddenPhrase === props.phrase ? (
              <h2 className="congrats-info">Congratulations! You Win!!</h2>
            ) : (
              <div>
                <h2 className="lose-info">Game Over</h2>
                <p>The correct phrase was: {props.phrase}. You missed {props.numOfIncorrect} times.</p>
              </div>
            )}
            <p>Your final score is: {props.score}</p>
            <button onClick={props.promptRestartGame}>Play Again</button>
          </div>
        )}
      </>
    );
}

export default Game;