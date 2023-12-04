import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; // Import Router and related components
import './App.css';
// import WheelOfFortuneGame from './WheelOfFortuneGame';
import LoginForm from './LoginForm';
import HeaderComponent from './HeaderComponent';
import WheelOfFortuneGame from './WheelOfFortuneGame';
import UserInfoDisplay from './UserInfoDisplay';
import { getAuth, signOut } from 'firebase/auth';
import RedeemGift from './RedeemGift';

function App() {
  // user is the currently logged in user
	const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [refreshUserInfo, setRefreshUserInfo] = useState(false); //refresh the list of current user info after posting data

  // this will be called by the LoginForm
	function HandleLogin(user, email, id) {
		setUser(user);
    setUserEmail(email);
    setUserId(id);

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
      <Router>
      {user ? (
        <div>
          <Switch>
            <Route exact path="/">
              <WheelOfFortuneGame userEmail={userEmail} onScoreSaved={handleRefreshUserInfo} refreshUserInfo={refreshUserInfo}/>
                <div className='LogInOut'>
                  <button onClick={HandleLogout}>Log Out</button>
                  <Link to='/redeem'><button>Gift Redeem</button></Link>
                </div>
            </Route>
            <Route path="/redeem">
              <RedeemGift userEmail={userEmail}/>
            </Route>
          </Switch>
        </div>
       ) :(
        <div>
          <HeaderComponent/>
          <LoginForm LoginEvent={HandleLogin}/>
        </div>
      )}
      </Router>
    </div>
  );
}

export default App;