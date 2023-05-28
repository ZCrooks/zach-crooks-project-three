const Results = (props) => {
    return (
        <div className="results">
            <div className="vital-info">
                <h2 className="title">{props.name}</h2>
                <p className="price">{props.price}</p> 
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