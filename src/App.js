import './App.css';
import Header from './components/Header';
import CoinButton from './components/CoinButton';
import Results from './components/Results';
import BuyButton from './components/BuyButton';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Results />
      </div>
    
      <Footer />
    </div>
  );
}

export default App;
