import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from './components/Header';
import CoinButton from './components/CoinButton';
import Results from './components/Results';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';

function App() {
  // Set State Items
  const [coinData, setCoinData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState([]);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState('$') 
  const [selectedCurrency, setSelectedCurrency] = useState('cad');
  const [changeCurrency, setChangeCurrency] = useState([]);
  // https://proxy.junocollege.com/
  useEffect(() => {
    axios({
      url: 'https://api.coingecko.com/api/v3/coins/markets',
      params: {
        ids: 'bitcoin, ethereum, tether, binancecoin, usd-coin, ripple, cardano, staked-ether, dogecoin, matic-network',
        vs_currency: 'cad'
      }
    }).then((apiData) => {
      setCoinData(apiData.data);
    })
  }, [])

// Method to re-render data to only display selected coin statistics 
const handleClick = (event) => {
  // Find the name of the coin that the user clicks on
  const coin = event.target.className;
  // Using that name, look into coin data for an object property with the same name 
  const data = coinData.filter((filteredCoin) => filteredCoin.name === coin)
  
  // Set new pieces of state for each statistic needed
  setSelectedCoin(data[0].name);
  setSelectedCoinPrice(data[0].current_price);
  // Render that object on the page
}


  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="button-div">
          {coinData.map((coin) => {
            return (
              <CoinButton 
              key={coin.symbol} 
              logo={coin.image} 
              handleClick={handleClick}
              currencyName={coin.name}
              price={coin.current_price}
              />)
          })}          
        </div>
        <Results 
          name={selectedCoin}
          price={`$${selectedCoinPrice.toLocaleString()}`}/>
      </div> {/* WRAPPER ENDS */}
    
      <Footer />
    </div>
  );
}

export default App;
        {/* {coinData.map((coin) => {
          return (
            <Results 
            name={coin.name}
            key={coin.symbol}
            
            />
          )
        })} */}