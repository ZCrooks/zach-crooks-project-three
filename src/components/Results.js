const Results = (props) => {

    return (
        <div className="results">
            <div className="vital-info">
                <h2 className="title">{props.currencyName}</h2>
                <p className="price"></p> 
            </div>
            <div className="data">
                <div className="stats">
                    <h3>Price Statistics</h3>
                    {/* 24h Low / 24h High  */}
                    {/* 7d Low / 7d High */}
                    {/* Total Volume */}
                    {/* Market Cap Rank */}
                    {/* Market Cap  */}
                    {/* Total Supply*/}
                </div>
                <div className="chart">

                </div>
            </div>      
        </div>
    )
}

export default Results;