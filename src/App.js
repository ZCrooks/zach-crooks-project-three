import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from './components/Header';
import CoinButton from './components/CoinButton';
import Results from './components/Results';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';

function App() {
  const [coinDetails, setCoinDetails] = useState([]);

  useEffect(() => {
    axios({
      url: 'https://proxy.junocollege.com/https://api.coingecko.com/api/v3/coins/markets',
      params: {
        ids: 'bitcoin, ethereum, tether, binancecoin, usd-coin, ripple, cardano, staked-ether, dogecoin, matic-network',
        vs_currency: 'cad'
      }
    }).then((apiData) => {
      // console.log(apiData.data);
      setCoinDetails(apiData.data);
    })
  }, [coinDetails])

// create a state item to store data coming from the Coin Gecko API 

// create a state item to store different currencies and their flags, that can be changed by the user (via a small dropdown selection) **
// create a method (getCoinData) to make a third-party API call to get all data needed / return an unsuccessful message in case of any errors 
// create a method (handleClick) to re-render data to only display coin price, chart, trading volume, etc. for that particular, selected coin (upon clicking the appropriate coin button)
// do this by using .map() to sort through that data and return the metrics needed to be displayed in the Results div (which takes up most of the page)


  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="button-div">
          {coinDetails.map((coin) => {
            return <CoinButton logo={coin.image}/>
          })}          
        </div>
        <Results />
        
      </div>
    
      <Footer />
    </div>
  );
}

export default App;
