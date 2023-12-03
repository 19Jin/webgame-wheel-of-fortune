import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AllInfoDisplay = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { displayUserInfo(); });

  function displayUserInfo(){
    axios.get('https://wheel-of-fortune-406910.wl.r.appspot.com/findAllScores')
    .then(response => {
      setUserInfo(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  };

  if (loading) {
    return <p>Loading...</p>
  }else if (error) {
    return <p>Error: {error}</p>
  }
  
  return (
    <div className='allinfo-display'>
      {userInfo.map((data, index) => (
        <div key={index} className='userinfo-detail'>
          {data.googleUID}, {data.userName}: {data.score}
        </div>
      ))}
    </div>
  );
}

export default AllInfoDisplay;