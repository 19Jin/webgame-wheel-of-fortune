import React ,{useState, useEffect} from "react";
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
    const [activeButton, setActiveButton] = useState(null); 
    const [checkOutPrice, setCheckOutPrice] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    const [itemId, setItemId] = useState('');
    const [userId, setUserId] = useState('');

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

    function handleCheckOut(id, price) {
        console.log("clicked");
        setCheckOut(true);
        setItemId(id);
        setCheckOutPrice(price);
        console.log(id);
        console.log(checkOut);
        console.log(price);
        console.log(totalPoints);
        console.log(amount*price);
        console.log(userId);

        if (activeButton) {
            const prevButton = document.querySelector(`.gift-button[data-id="${activeButton}"]`);
            prevButton.classList.remove("active");
        }
        setActiveButton(id);
        const button = document.querySelector(`.gift-button[data-id="${id}"]`);
        button.classList.add("active");

    }

    document.addEventListener("mouseup", function (e) {
        const button = document.querySelector(".gift-button");
        if (!button.contains(e.target)) {
            button.classList.remove("active");
        }
    });

    function handleUserId() {
        user.map(i => (
            setTotalPoints(i.totalPoints)
        ))
        user.map(i => (
            setUserId(i.id)
        ))
    }



    function handleFormSubmit(e) {
        e.preventDefault(); // Prevents the default form submit action
        // Implement what you want to do with the form data here
        console.log({ name, email, phone, address });

        if(totalPoints - (amount*checkOutPrice) >= 0){
            const request1 = axios.put(`https://wheel-of-fortune-406910.wl.r.appspot.com/updateCommodity/${itemId}?changeAmount=${amount}`);
            const request2 = axios.put(`https://wheel-of-fortune-406910.wl.r.appspot.com/updatePoint/${userId}?changeAmount=${amount * checkOutPrice}`);
            Promise.all([request1, request2])
            .then((responses) => {
              // Handle success for both requests
              const [response1, response2] = responses;
              console.log('Commodity item updated successfully:', response1.data);
              console.log('Point updated successfully:', response2.data);
        
              setLoading(false);
              window.location.reload();
            })
            .catch((error) => {
              // Handle errors for both requests
              setError(error.message);
              setLoading(false);
            });
        }else{
            alert('You do not have enough points!')
        }

        // axios.put(`https://wheel-of-fortune-406910.wl.r.appspot.com/updateCommodity/${itemId}?changeAmount=${amount}`)
        // .then((response) => {
        //      // Axios packs the response in a 'data' property
        //     console.log('Commodity item updated successfully:', response.data);
            
        //     setLoading(false);
        //     window.location.reload();
        //   })
        //   .catch(error => {
        //     setError(error.message);
        //     setLoading(false);
        //   });
        // if(totalPoints - (amount*checkOutPrice) >= 0){
        //     axios.put(`https://wheel-of-fortune-406910.wl.r.appspot.com/updatePoint/${userId}?changeAmount=${amount*checkOutPrice}`)
        //     // You might want to send this data to a server or use it in another way
        //     .then((response) => {
        //         // Axios packs the response in a 'data' property
        //        console.log('Point updated successfully:', response.data);
               
        //        setLoading(false);
        //        window.location.reload();
        //      })
        //      .catch(error => {
        //        setError(error.message);
        //        setLoading(false);
        //      });
        // }else{
        //     alert('You do not have enough points!')
        // }
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
              <button className="gift-button" data-id={gift.id} onClick={() => handleCheckOut(gift.id, gift.price)}>
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
        handleUserId();
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
        <button type="submit" onClick={handleUserId}>Submit</button>
      </form>
    </div>) :
      (<div></div>)}
      <Link to="/"><button>Back to Game</button></Link>
    </div>
  );
}

export default RedeemGift;
