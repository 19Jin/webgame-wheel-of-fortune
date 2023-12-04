import react ,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import './Gift.css';
import axios from 'axios';


function RedeemGift({userEmail}) {

    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);

    function displayAllCommodity() {
        axios.get('https://wheel-of-fortune-406910.wl.r.appspot.com/findAllCommodities')
        .then(response => {
          setGifts(response.data);  // Axios packs the response in a 'data' property
          console.log(gifts);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    
    };

    function displayPoints() {
      axios.get(`http://localhost:8080/findByGoogleUid?googleUid=${userEmail}`)
      .then(response => {
        setUser(response.data);  // Axios packs the response in a 'data' property
        // console.log(gifts);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  
  };
  // Function to create rows with 3 gifts each
  const createGiftRows = () => {
    const rows = [];
    for (let i = 0; i < gifts.length; i += 3) {
      const rowGifts = gifts.slice(i, i + 3);
      rows.push(
        <tr key={i}>
          {rowGifts.map(gift => (
            <td key={gift.id}>
              <button className="gift-button">
                <img className="gift-image" src={gift.imageLink} alt={`Gift ${gift.number}`} />
                <p>Gift Name: {gift.itemName}</p>
                <p>Number: {gift.number}</p>
                <p>Price: {gift.price}</p>
              </button>
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };


  useEffect(() => {
    // Using Axios to fetch data
   
        displayAllCommodity();
        displayPoints();
    }, [userEmail]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="redeem-gifts">
      <div className="user-points">
        Your Points: {user.map(i => (
          <h1>{i.totalPoints}</h1>
        ))}
      </div>
      <h1 className="gift-header">Gift Redeem</h1>
      <table className="gift-table">
        <tbody>
          {createGiftRows()}
        </tbody>
      </table>
      <Link to="/"><button>Back to Game</button></Link>
    </div>
  );
}

export default RedeemGift;
