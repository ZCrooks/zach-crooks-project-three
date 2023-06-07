import './App.css';
import { useState, useEffect, } from 'react';
import axios from "axios";
import Header from './components/Header';
import CoinButton from './components/CoinButton';
import Results from './components/Results';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';

function App() {

  // SET COINGECKO API DATA STATE
  const [coinData, setCoinData] = useState([]);

  // SET STATE FOR COIN NAMES AND STATISTICS
  const [selectedCoin, setSelectedCoin] = useState({
    name: '',
    image: '',
    price: '',
    dayHigh: '',
    dayLow: '',
    priceChange: '',
    priceChangePercent: '',
    ath: '',
    atl: '',
    volume: '',
    marketCap: '',
    marketCapRank: '',
    supply: ''
  });

  // SET CURRENCY CHANGER STATE
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  // GRAB BASIC COIN DATA VIA USEEFFECT
  useEffect(() => {
    axios({
      url: 'https://api.coingecko.com/api/v3/coins/markets',
      params: {
        ids: 'bitcoin, ethereum, tether, binancecoin, usd-coin, ripple, cardano, staked-ether, dogecoin, matic-network',
        vs_currency: selectedCurrency
      }
    }).then((apiData) => {
      setCoinData(apiData.data);
      // Ensure prices and statistics are being updated based on selected Currency
      const coin = apiData.data.find((coin) => coin.name === selectedCoin.name); 
      // Update the selected coin's price if selectedCoin is defined
      if (coin) {
        setSelectedCoin(prevState => ({
          ...prevState,
          price: coin.current_price,
          priceChange: coin.price_change_24h,
          ath: coin.ath,
          atl: coin.atl,
          dayLow: coin.low_24h,
          dayHigh: coin.high_24h
        }));
      }
    })
    .catch((error) => {
      console.error("Error fetching coin data:", error);
      alert("Data is not available right now. Please try again in a few minutes!")
    });
  }, [selectedCurrency, selectedCoin.name]);


// METHOD TO RE-RENDER DATA TO ONLY DISPLAY SELECTED COIN STATISTICS ONCE APPROPRIATE BUTTON IS CLICKED
const handleClick = (event) => {
  // Find the name of the coin that the user clicks on
  const coin = event.target.className;
  // Using that name, look into coin data for an object property with the same name 
  const data = coinData.find((filteredCoin) => filteredCoin.name === coin)
  
  // Set new pieces of state for each statistic needed
  setSelectedCoin({
    name: data.name,
    image: data.image,
    price: data.current_price,
    priceChange: data.price_change_24h,
    priceChangePercent: data.price_change_percentage_24h,
    ath: data.ath,
    atl: data.atl,
    volume: data.total_volume,
    marketCap: data.market_cap,
    marketCapRank: data.market_cap_rank,
    supply: data.total_supply,
    dayLow: data.low_24h,
    dayHigh: data.high_24h,
  });
}

// METHOD TO DISPLAY CORRECT CURRENCY SYMBOL
const currencySymbol = (selectedCurrency) => {
  let symbol;
  if (selectedCurrency === 'usd' || selectedCurrency === 'cad') {
    symbol = '$';
  } else if (selectedCurrency === 'gbp') {
    symbol = '£';
  } else if (selectedCurrency === 'eur') {
    symbol = '€';
  } else if (selectedCurrency === 'jpy') {
    symbol = '¥';
  } else {
    symbol = '';
  }
  return symbol;
}

// JSX
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
                priceChange={coin.price_change_24h}
                priceChangePercent={coin.price_change_percentage_24h}
                dayLow={coin.low_24h}
                dayHigh={coin.high_24h}
                allTimeHigh={coin.ath}
                allTimeLow={coin.atl}
                volume={coin.total_volume}
                marketCap={coin.market_cap}
                marketCapRank={coin.market_cap_rank}
                supply={coin.total_supply}
                image={coin.image}
              />)
          })}         
        </div>
        <Results 
          currencySymbol={currencySymbol}
          name={selectedCoin.name.toUpperCase()}
          price={`${currencySymbol(selectedCurrency)}${selectedCoin.price.toLocaleString()}`}
          priceChange={`${selectedCoin.priceChange.toLocaleString()}`}
          priceChangePercent={`${selectedCoin.priceChangePercent.toLocaleString()}%`}
          lowHigh={`${selectedCoin.dayLow.toLocaleString()} / ${currencySymbol(selectedCurrency)}${selectedCoin.dayHigh.toLocaleString()}`}
          allTimeHigh={`${selectedCoin.ath.toLocaleString()}`}
          allTimeLow={`${selectedCoin.atl.toLocaleString()}`}
          volume={selectedCoin.volume.toLocaleString()}
          marketCap={selectedCoin.marketCap.toLocaleString()}
          marketCapRank={selectedCoin.marketCapRank.toLocaleString()}
          supply={selectedCoin.supply.toLocaleString()}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          image={selectedCoin.image}
          />
          <BuyButton />
      </div> {/* WRAPPER ENDS */}
      <Footer />
    </div>
  );
}
export default App;
