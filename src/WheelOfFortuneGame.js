import AudioController from './AudioController';
import './App.css';
import React, { useState, useEffect } from 'react';
import HeaderComponent from './HeaderComponent';
import UserInfoDisplay from './UserInfoDisplay';
import {saveScoreToDB} from './SaveData';
import AllInfoDisplay from './AllInfoDisplay';
import ConfirmBox from './ConfirmBox';

function WheelOfFortuneGame({userEmail, onScoreSaved, refreshUserInfo}) {
  const [numOfGuessesAllowed, setNumOfGuessesAllowed] = useState(0);
  const [phrase, setPhrase] = useState('');
  const [hiddenPhrase, setHiddenPhrase] = useState('');
  const [numOfGuess, setNumOfGuess] = useState(0);
  const [numOfIncorrect, setNumOfIncorrect] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [userEnteredGuesses, setUserEnteredGuesses] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [hasLost, setHasLost] = useState(false);
  const [userName, setUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  useEffect(() => {
    setNumOfGuessesAllowed(10);
    fetchRandomPhrase();
  }, []);

  const fetchRandomPhrase = () => {
    const phrases = ['Change the world from here', 'Be the change you wish to see', 'Wheel of Fortune','Turn your wounds into wisdom'];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex];

    setPhrase(randomPhrase);
    setHiddenPhrase(generateHiddenPhrase(randomPhrase));
    setGuessedLetters([]);
  };

  const generateHiddenPhrase = (phrase) => {
    return phrase.replace(/[a-zA-Z]/g, '*');
  };

  const handleGuess = () => {
    if (!userGuess.match(/[a-zA-Z]/)) {
      alert('You should guess a letter.');
      return;
    }

    if (!userGuess.match(/^[a-zA-Z]$/)) {
      alert('You should guess only ONE letter each time');
      return;
    }

    if(guessedLetters.includes(userGuess.toUpperCase())){
      alert('You have already guessed this letter before');
      return;
    }

    if (!userGuess) {
      alert('Please enter a letter');
      return;
    }

    const updatedHiddenPhrase = hiddenPhrase.split('');
    let hasCorrectGuess = false;

    setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, userGuess.toUpperCase()]);

    for (let i = 0; i < phrase.length; i++) {
      if (phrase[i].toLowerCase() === userGuess.toLowerCase()) {
        updatedHiddenPhrase[i] = phrase[i];
        hasCorrectGuess = true;
      }
    }

    setHiddenPhrase(updatedHiddenPhrase.join(''));

    if (hasCorrectGuess) {
      setScore(score + 10); // 猜对一个字母加10分
    } else {
      setScore(score - 1); // 猜错扣1分
      alert('Wrong Guess');
      setNumOfIncorrect(numOfIncorrect + 1);
    }

    setNumOfGuess(numOfGuess + 1);
    setUserGuess('');

    if (numOfGuess === numOfGuessesAllowed - 1 || updatedHiddenPhrase.join('') === phrase) {
      checkWinLoss(hasCorrectGuess);
    }
  };

  const checkWinLoss = (hasCorrectGuess) => {
    const won = hiddenPhrase === phrase;
    setGameOver(true);

    setShowConfirmBox(true);

    // const updateScore = window.confirm('Game Over. Do you want to update this game score?');
    // if (updateScore) {
    //   saveScoreToDB(userEmail, score, userName, onScoreSaved);
    // }

    if (!won) {
      setHasLost(true);
    }
  };

  const handleNumOfGuessesChange = (e) => {
    setNumOfGuessesAllowed(parseInt(e.target.value));
  };

  const startGame = () => {
    setUserEnteredGuesses(true);
    setGameOver(false);
    fetchRandomPhrase();
    setNumOfGuess(0);
    setNumOfIncorrect(0);
    setScore(0); 
  };

  const promptRestartGame = () => {
    const wantToRestart = window.confirm('Game Over! Do you want to play another round of Wheel of Fortune?');
    if (wantToRestart) {
      restartGame();
    } else {
      setUserEnteredGuesses(false);
      setNumOfGuess(0);
      setNumOfIncorrect(0);
      setScore(0);
    }
  };

  const restartGame = () => {
    setNumOfGuess(0);
    setNumOfIncorrect(0);
    setUserEnteredGuesses(false);
    fetchRandomPhrase();
    setGameOver(false);
    setScore(0);
    setGuessedLetters([]);
    setHasLost(false);
  };

  const purchaseExtraGuesses = () => {
    const confirmPurchase = window.confirm('Do you want to purchase 3 extra guesses? Share this game with your friends to unlock!');
    if (confirmPurchase) {

      const gameUrl = window.location.href; 
      const dummyElement = document.createElement('textarea');
      document.body.appendChild(dummyElement);
      dummyElement.value = gameUrl;
      dummyElement.select();
      document.execCommand('copy');
      document.body.removeChild(dummyElement);
      alert('Game URL copied to clipboard. Share it with your friends to get 3 extra guesses!');
      // suppose the user has shared the link
      setNumOfGuessesAllowed(prevNumOfGuessesAllowed => prevNumOfGuessesAllowed + 3);
    }
  };

  const handleNewUserName = (e) => {
    if(newUserName){
      setUserName(newUserName);
    }
  };

  const hasWon = hiddenPhrase === phrase;

  return (
    <div className="WheelOfFortuneGame">
      <HeaderComponent />
      <AudioController audioFile={require('./assets/01-main-theme-overworld.mp3')}
      playWinSound={hiddenPhrase === phrase && gameOver}
      playLoseSound={gameOver && hasLost}
      />

      {/* {userEnteredGuesses && userName && <UserInfoDisplay googleUID={userEmail}/> && <AllInfoDisplay/>} */}
      {userEnteredGuesses && userName && (
        <div>
          <div className='current-google-id-container'>
            <div className='google-id'>Google&nbsp;&nbsp;ID: </div>
            <div className='id-container'>{userEmail}</div>
          </div>
          <UserInfoDisplay googleUID={userEmail} className="userinfo-display"/>
          <AllInfoDisplay className="allinfo-display"/>
        </div>
      )}

      {userEnteredGuesses && (
        <UserInfoDisplay googleUID={userEmail} refreshTrigger={refreshUserInfo} />
      )}

      {userEnteredGuesses ? (
        <>
          <div className="change-username">
            <input
              type="text"
              placeholder="Enter  New User Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button onClick={handleNewUserName}>Set New Name</button>
          </div>
          <div className="phrase-display">The&nbsp;&nbsp;&nbsp;phrase&nbsp;&nbsp;is:&nbsp; {phrase}</div>
          <div className="hidden-phrase-display">Hidden&nbsp;&nbsp;&nbsp;Phrase: {hiddenPhrase}</div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter &nbsp;&nbsp;a&nbsp;&nbsp;&nbsp;&nbsp;letter"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
            />
            <button onClick={handleGuess}>Guess</button>
            <button onClick={purchaseExtraGuesses}>Purchase&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;Extra&nbsp;&nbsp;&nbsp;Guesses</button>
          </div>
          <div className="scoreboard">
            <p>{userName}'s &nbsp;&nbsp; Score: {score}</p>
            <p>Number of Guesses Allowed: {numOfGuessesAllowed}</p>
            <p>Number of Incorrect Guesses: {numOfIncorrect}</p>
            <p>Number of Guesses Remaining: {numOfGuessesAllowed - numOfGuess}</p>
          </div>
          {gameOver && (
            <div className="game-over-message">
              {hiddenPhrase === phrase ? (
                <h2 className="congrats-info">Congratulations! You Win!!</h2>
              ) : (
                <div>
                  <h2 className="lose-info">Game Over</h2>
                  <p>The correct phrase was: {phrase}. You missed {numOfIncorrect} times.</p>
                </div>
              )}
              <p>Your final score is: {score}</p>
              <button onClick={promptRestartGame}>Play Again</button>
            </div>
          )}
        </>
      ) : (
        <div className="start-container">
          <input
              type="text"
              placeholder="Enter  Your User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
          />
          <div className='start-button'>
            <button onClick={startGame}>Start Game</button>
          </div>
        </div>
      )}

      {/* add ConfirmModal here: */}
      <ConfirmBox
        isOpen={showConfirmBox}
        onClose={() => setShowConfirmBox(false)}
        onConfirm={() => {
          saveScoreToDB(userEmail, score, userName, onScoreSaved);
          setShowConfirmBox(false);
        }}
      />

      <footer>
        <p>CS514 - Web Game Project - Made by Junyu and Xueting</p>
      </footer>
    </div>
  );
}

export default WheelOfFortuneGame;