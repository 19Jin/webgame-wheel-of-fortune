import React, { useState } from 'react';
import './App.css';
// import WheelOfFortuneGame from './WheelOfFortuneGame';
import LoginForm from './LoginForm';
import HeaderComponent from './HeaderComponent';
import WheelOfFortuneGame from './WheelOfFortuneGame';
import UserInfoDisplay from './UserInfoDisplay';
import { getAuth, signOut } from 'firebase/auth';

function App() {
  // user is the currently logged in user
	const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [refreshUserInfo, setRefreshUserInfo] = useState(false); //refresh the list of current user info after posting data

  // this will be called by the LoginForm
	function HandleLogin(user, email) {
		setUser(user);
    setUserEmail(email);
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

  const handleRefreshUserInfo = () => {
    setRefreshUserInfo(prevState => !prevState);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <WheelOfFortuneGame userEmail={userEmail} onScoreSaved={handleRefreshUserInfo} refreshUserInfo={refreshUserInfo}/>
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