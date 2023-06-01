const CoinButton = (props) => {
    return (
        <button id="crypto-button" onClick={props.handleClick} className={props.currencyName}><img src={props.logo} className={props.currencyName} alt="cryptocurrency logo button"/> </button>
    )
}

export default CoinButton;