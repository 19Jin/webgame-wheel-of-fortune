import React, { useState } from 'react';
import './App.css';
// import WheelOfFortuneGame from './WheelOfFortuneGame';
import LoginForm from './LoginForm';
import HeaderComponent from './HeaderComponent';
import WheelOfFortuneGame from './WheelOfFortuneGame';
import { getAuth, signOut } from 'firebase/auth';

function App() {
  // user is the currently logged in user
	const [user, setUser] = useState(null);

  // this will be called by the LoginForm
	function HandleLogin(user) {
		setUser(user);
	}

  function HandleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("User successfully logged out");
      setUser(null);
    }).catch((error) => {
      console.error("Logout error", error);
    });
  }

  return (
    <div className="App">
      {user ? (
        <div>
          <WheelOfFortuneGame/>
          <div className='LogInOut'>
            <button onClick={HandleLogout}>Log Out</button>
          </div>
        </div>
       ) :(
        <div>
          <HeaderComponent/>
          <LoginForm LoginEvent={HandleLogin}/>
        </div>
      )}
    </div>
  );
}

export default App;