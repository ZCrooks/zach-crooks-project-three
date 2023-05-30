import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from './components/Header';
import CoinButton from './components/CoinButton';
import Results from './components/Results';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';

function App() {
  // COINGECKO API DATA STATE
  const [coinData, setCoinData] = useState([]);

  // COIN STATISTICS STATE
  const [selectedCoinName, setSelectedCoinName] = useState([]);
  const [selectedCoinImage, setSelectedCoinImage] = useState('');
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(''); 
  const [selectedCoinDayHigh, setSelectedCoinDayHigh] = useState('');
  const [selectedCoinDayLow, setSelectedCoinDayLow] = useState('');
  const [selectedCoinATH, setSelectedCoinATH] = useState('');
  const [selectedCoinATL, setSelectedCoinATL] = useState('');
  const [selectedCoinVolume, setSelectedCoinVolume] = useState('');
  const [selectedCoinMarketCap, setSelectedCoinMarketCap] = useState('');
  const [selectedCoinMarketCapRank, setSelectedCoinMarketCapRank] = useState('');
  const [selectedCoinSupply, setSelectedCoinSupply] = useState('');

  // CURRENCY CHANGER STATE
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
      const selectedCoin = apiData.data.find((coin) => coin.name === selectedCoinName);
      // Update the selected coin's price if selectedCoin is defined
      if (selectedCoin) {
        setSelectedCoinPrice(selectedCoin.current_price);
        setSelectedCoinATH(selectedCoin.ath);
        setSelectedCoinATL(selectedCoin.atl);
        setSelectedCoinDayLow(selectedCoin.low_24h);
        setSelectedCoinDayHigh(selectedCoin.high_24h);
      }
    });
  }, [selectedCurrency, selectedCoinName])


// METHOD TO RE-RENDER DATA TO ONLY DISPLAY SELECTED COIN STATISTICS
const handleClick = (event) => {
  // Find the name of the coin that the user clicks on
  const coin = event.target.className;
  // Using that name, look into coin data for an object property with the same name 
  const data = coinData.filter((filteredCoin) => filteredCoin.name === coin)
  
  // Set new pieces of state for each statistic needed
  setSelectedCoinName(data[0].name);
  setSelectedCoinImage(data[0].image);
  setSelectedCoinPrice(data[0].current_price);
  setSelectedCoinATH(data[0].ath);
  setSelectedCoinATL(data[0].atl);
  setSelectedCoinVolume(data[0].total_volume);
  setSelectedCoinMarketCap(data[0].market_cap);
  setSelectedCoinMarketCapRank(data[0].market_cap_rank);
  // Dogecoin error handling for missing Total Supply Property
  if (data[0].total_supply === null) {
    setSelectedCoinSupply('N/A');
  } else {
    setSelectedCoinSupply(data[0].total_supply);
  } // Error handling ends
  setSelectedCoinDayLow(data[0].low_24h);
  setSelectedCoinDayHigh(data[0].high_24h);
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
          name={selectedCoinName.toString().toUpperCase()}
          price={`${currencySymbol(selectedCurrency)}${selectedCoinPrice.toLocaleString()}`}
          lowHigh={`${currencySymbol(selectedCurrency)}${selectedCoinDayLow.toLocaleString()} / ${currencySymbol(selectedCurrency)}${selectedCoinDayHigh.toLocaleString()}`}
          allTimeHigh={`${currencySymbol(selectedCurrency)}${selectedCoinATH.toLocaleString()}`}
          allTimeLow={`${currencySymbol(selectedCurrency)}${selectedCoinATL.toLocaleString()}`}
          volume={selectedCoinVolume.toLocaleString()}
          marketCap={selectedCoinMarketCap.toLocaleString()}
          marketCapRank={selectedCoinMarketCapRank.toLocaleString()}
          supply={selectedCoinSupply.toLocaleString()}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          image={selectedCoinImage}
          />
      </div> {/* WRAPPER ENDS */}
      <Footer />
    </div>
  );
}

export default App;
