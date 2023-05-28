import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Header from './components/Header';
import CoinButton from './components/CoinButton';
import Results from './components/Results';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';

function App() {
  // SET STATE ITEMS

  // Data
  const [coinData, setCoinData] = useState([]);

  // Statistics
  const [selectedCoinName, setSelectedCoinName] = useState([]);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState('');
  const [selectedCoinDayHigh, setSelectedCoinDayHigh] = useState('');
  const [selectedCoinDayLow, setSelectedCoinDayLow] = useState('');
  const [selectedCoinATH, setSelectedCoinATH] = useState('');
  const [selectedCoinATL, setSelectedCoinATL] = useState('');
  const [selectedCoinVolume, setSelectedCoinVolume] = useState('');
  const [selectedCoinMarketCap, setSelectedCoinMarketCap] = useState('');
  const [selectedCoinMarketCapRank, setSelectedCoinMarketCapRank] = useState('');
  const [selectedCoinSupply, setSelectedCoinSupply] = useState('');

  // Currency Changer
  const [selectedCurrency, setSelectedCurrency] = useState('cad');
  const [changeCurrency, setChangeCurrency] = useState([]);
  // https://proxy.junocollege.com/
  useEffect(() => {
    axios({
      url: 'https://proxy.junocollege.com/https://api.coingecko.com/api/v3/coins/markets',
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
  setSelectedCoinName(data[0].name);
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
  }
  setSelectedCoinDayLow(data[0].low_24h);
  setSelectedCoinDayHigh(data[0].high_24h);
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
              dayLow={coin.low_24h}
              dayHigh={coin.high_24h}
              allTimeHigh={coin.ath}
              allTimeLow={coin.atl}
              volume={coin.total_volume}
              marketCap={coin.market_cap}
              marketCapRank={coin.market_cap_rank}
              supply={coin.total_supply}
              />)
          })}          
        </div>
        <Results 
          name={selectedCoinName.toString().toUpperCase()}
          price={`$${selectedCoinPrice.toLocaleString()}`}
          lowHigh={`$${selectedCoinDayLow} / $${selectedCoinDayHigh}`}
          allTimeHigh={`$${selectedCoinATH.toLocaleString()}`}
          allTimeLow={`$${selectedCoinATL.toLocaleString()}`}
          volume={selectedCoinVolume.toLocaleString()}
          marketCap={selectedCoinMarketCap.toLocaleString()}
          marketCapRank={selectedCoinMarketCapRank.toLocaleString()}
          supply={selectedCoinSupply.toLocaleString()}
          />
      </div> {/* WRAPPER ENDS */}
    
      <Footer />
    </div>
  );
}

export default App;