const Results = (props) => {
    // GRAB USER INTL CURRENCY DROPDOWN SELECTION
    const changeCurrency = (event) => {
        props.setSelectedCurrency(event.target.value);
    };
    return (
        <div className="results">
            <div className="vital-info">
                <div className="title">
                    <h2>{props.name}</h2>
                </div>
                
                <div className="price-currency-div">
                    <p className="price">Price: {props.price}</p> 
                    {/* Currency Changer */}
                    <select id="currency" value={props.selectedCurrency} onChange={changeCurrency} >
                        <option value="usd">&#127482;&#127480; USD</option>
                        <option value="cad">&#127464;&#127462; CAD</option>
                        <option value="eur">&#127466;&#127482; EUR</option>
                        <option value="gbp">&#127468;&#127463; GBP</option>
                        <option value="jpy">&#127471;&#127477; JPY</option>
                    </select>                    
                </div>
            </div>
            <div className="data">
                <div className="stats">
                    <h3 className="stats-header">Coin Statistics</h3>
                    <p className="stats-text">24h Price Change: {props.priceChange} </p>
                    <p className="stats-text">24h Price Change (percentage): {props.priceChangePercent}</p>
                    <p className="stats-text">24h Low / 24h High: {props.lowHigh} </p>
                    <p className="stats-text">All Time High: {props.allTimeHigh}</p>
                    <p className="stats-text">All Time Low: {props.allTimeLow}</p>
                    <p className="stats-text">Trading Volume: {props.volume} </p>
                    <p className="stats-text">Market Cap: {props.marketCap} </p>
                    <p className="stats-text">Market Cap Rank: {props.marketCapRank}</p>
                    <p className="stats-text">Total Supply: {props.supply}</p>
                </div>
                <div className="img-container">
                    {props.image ? (
                        <img src={props.image} className="main-image" alt="cryptocurrency logo small" />                        
                    ) : (
                        <div className="default-text">PLEASE SELECT A CRYPTOCURRENCY</div>
                    )}
                </div>
            </div>      
        </div>
    )
}
export default Results;