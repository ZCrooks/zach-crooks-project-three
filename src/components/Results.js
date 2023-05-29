const Results = (props) => {

    const changeCurrency = (event) => {
        console.log(event.target.value)
        props.setSelectedCurrency(event.target.value);
    };

    return (
        <div className="results">
            <div className="vital-info">
                <h2 className="title">{props.name}</h2>
                <div className="price-currency-div">
                    <p className="price">Price: {props.price}</p> 
                    {/* Currency Changer */}
                    <select id="currency" value={props.selectedCurrency} onChange={changeCurrency} >
                        <option value="usd">&#127482;&#127480;</option>
                        <option value="cad">&#127464;&#127462;</option>
                        <option value="eur">&#127466;&#127482;</option>
                        <option value="gbp">&#127468;&#127463;</option>
                        <option value="jpy">&#127471;&#127477;</option>
                    </select>                    
                </div>
            </div>
            <div className="data">
                <div className="stats">
                    <h3 className="stats-text">Coin Statistics</h3>
                    <p>24h Low / 24h High: {props.lowHigh} </p>
                    <p>All Time High: {props.allTimeHigh}</p>
                    <p>All Time Low: {props.allTimeLow}</p>
                    <p>Trading Volume: {props.volume} </p>
                    <p>Market Cap: {props.marketCap} </p>
                    <p>Market Cap Rank: {props.marketCapRank}</p>
                    <p>Total Supply: {props.supply}</p>
                </div>
                <div className="chart">
                   
                </div>
            </div>      
        </div>
    )
}

export default Results;