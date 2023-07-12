// RESULTS COMPONENT
const Results = (props) => {
    // GRAB USER INTL CURRENCY DROPDOWN SELECTION
    const changeCurrency = (event) => {
        props.setSelectedCurrency(event.target.value);
    };
    
    // DISPLAY RESULTS ON PAGE
    return (
        <div className="results">
            <div className="vital-info">
                {/* Cryptocurrency Name */}
                <div className="title">
                    <h2>{props.name}</h2>
                </div>
                {/* Cryptocurrency Current Price */}
                <div className="price-currency-div">
                    <p className="price">Price: {props.price}</p> 
                    {/* Currency Changer Dropdown */}
                    <select id="currency" value={props.selectedCurrency} onChange={changeCurrency} >
                        <option value="usd"><span aria-hidden="true">&#127482;&#127480;</span> USD</option>
                        <option value="cad"><span aria-hidden="true">&#127464;&#127462;</span> CAD</option>
                        <option value="eur"> <span aria-hidden="true">&#127466;&#127482;</span> EUR</option>
                        <option value="gbp"><span aria-hidden="true">&#127468;&#127463;</span> GBP</option>
                        <option value="jpy"><span aria-hidden="true">&#127471;&#127477;</span> JPY</option>
                    </select>                    
                </div>
            </div>
            <div className="data">
                {/* Cryptocurrency Basic Statistics */}
                <div className="stats">
                    <h3 className="stats-header">Coin Statistics</h3>
                    <p className="stats-text">24h Price Change: {props.currencySymbol(props.selectedCurrency)}{props.priceChange}</p>
                    <p className="stats-text">24h Price Change (percentage): {props.priceChangePercent}</p>
                    <p className="stats-text">24h Low / 24h High: {props.currencySymbol(props.selectedCurrency)}{props.lowHigh}</p>
                    <p className="stats-text">All Time High: {props.currencySymbol(props.selectedCurrency)}{props.allTimeHigh}</p>
                    <p className="stats-text">All Time Low: {props.currencySymbol(props.selectedCurrency)}{props.allTimeLow}</p>
                    <p className="stats-text">Trading Volume: {props.volume}</p>
                    <p className="stats-text">Market Cap: {props.marketCap}</p>
                    <p className="stats-text">Market Cap Rank: {props.marketCapRank}</p>
                    <p className="stats-text">Total Supply: {props.supply}</p>
                </div>
                <div className="img-container">
                    {props.image ? (
                        <img src={props.image} className="main-image" alt={`${props.name} large logo`} />                        
                    ) : (
                        <div className="default-text">PLEASE SELECT A CRYPTOCURRENCY</div>
                    )}
                </div>
            </div>      
        </div>
    )
}
export default Results;