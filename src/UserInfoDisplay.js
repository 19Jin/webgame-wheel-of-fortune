import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserInfoDisplay = ({ googleUID, refreshTrigger }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => { displayUserInfo();}, [googleUID, refreshTrigger]);

  function displayUserInfo(){
    axios.get(`https://wheel-of-fortune-406910.wl.r.appspot.com/findByGoogleUID?googleUID=${googleUID}`)
    .then(response => {
      setUserInfo(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  };

  // function displayUserPoints() {
  //   axios.get(`http://localhost:8080/findByGoogleUid?googleUid=${googleUID}`)
  //     .then(response => {
  //       setUserInfo(response.data);
  //       setLoading(false);
  
  //       //Extract total score and save to state
  //       const totalPoints = response.data.reduce((total, data) => total + data.totalPoints, 0);
  //       setTotalPoints(totalPoints);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/deleteById?id=${id}`)
    .then(() => {
      displayUserInfo();
    })
    .catch(error => {
      setError(error.message);
    });
  }

  
  if (loading) {
    return <p>Loading...</p>
  }else if (error) {
    return <p>Error: {error}</p>
  }
  
  return (
    <div className='userinfo-display'>
      {userInfo.map((data, index) => (
        <div key={index} className='userinfo-detail'>
          {data.userName}: {data.score}, {data.time}
          <button className="delete-button" onClick={() => handleDelete(data.id)}>DEL</button>
        </div>
      ))}
      {/* show total point of this google uid */}
      {/* <div className='current-total-points'>
        Your Total Points: {totalPoints}
      </div> */}
    </div>
  );
}

export default UserInfoDisplay;