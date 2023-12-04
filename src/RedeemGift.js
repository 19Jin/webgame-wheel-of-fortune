import react ,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import './Gift.css';
import axios from 'axios';


function RedeemGift({userEmail}) {

    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const [checkOut, setCheckOut] = useState(false);
    const [amount, setAmount] = useState(1);

    const [itemId, setItemId] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


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
      axios.get(`https://wheel-of-fortune-406910.wl.r.appspot.com/findByGoogle?google=${userEmail}`)
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

    function handleCheckOut(id) {
        console.log("clicked");
        setCheckOut(true);
        setItemId(id);
        console.log(id);
        console.log(checkOut);
    }

    function handleCheckOut(id) {
      console.log("clicked");
      setCheckOut(true);
      setItemId(id);
      console.log(id);
      console.log(checkOut);
  
      // add .active class to hit hover style
      const button = document.querySelector(`.gift-button[data-id="${id}"]`);
      button.classList.add("active");
    }

    document.addEventListener("mouseup", function (e) {
      const button = document.querySelector(".gift-button");
      if (!button.contains(e.target)) {
          button.classList.remove("active");
      }
    });

    function handleFormSubmit(e) {
        e.preventDefault(); // Prevents the default form submit action
        // Implement what you want to do with the form data here
        console.log({ name, email, phone, address });

        axios.put(`https://wheel-of-fortune-406910.wl.r.appspot.com/updateCommodity/${itemId}?changeAmount=${amount}`)
        .then((response) => {
             // Axios packs the response in a 'data' property
            console.log('Commodity item updated successfully:', response.data);
            
            setLoading(false);
            window.location.reload();
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
        // You might want to send this data to a server or use it in another way
    }

  // Function to create rows with 3 gifts each
  const createGiftRows = () => {
    const rows = [];
    for (let i = 0; i < gifts.length; i += 3) {
      const rowGifts = gifts.slice(i, i + 3);
      rows.push(
        <tr key={i}>
          {rowGifts.map(gift => (
            <td key={gift.id}>
              <button className="gift-button" data-id={gift.id} onClick={() => handleCheckOut(gift.id)}>
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
      {checkOut? 
      (<div className="vertical-form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" >Submit</button>
      </form>
    </div>) :
      (<div></div>)}
      <Link to="/"><button>Back to Game</button></Link>
    </div>
  );
}

export default RedeemGift;
