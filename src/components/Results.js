import CoinButton from "./CoinButton";
import { useState, useEffect } from 'react';
import axios from "axios";

const Results = () => {
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        axios({
            url: 'https://proxy.junocollege.com/https://api.coingecko.com/api/v3/coins/'
        }).then((apiData) => {
            setCoinData(apiData.data);
        })
    }, [coinData])

    return (
        <div className="results">
            <div className="vital-info">
                <h2 className="title">Hello</h2>
                <CoinButton />
                <p className="price"></p> 
            </div>
            <div className="data">
                <div className="stats">
                    <h3></h3>
                </div>
                <div className="chart">

                </div>
            </div>      
        </div>
    )
}

export default Results;