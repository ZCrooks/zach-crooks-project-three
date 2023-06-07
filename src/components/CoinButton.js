// COIN BUTTON COMPONENT
const CoinButton = (props) => {
    return (
        <button id="crypto-button" onClick={props.handleClick} className={props.currencyName}><img src={props.logo} className={props.currencyName} alt={`${props.currencyName} logo button`}/> </button>
    )
}

export default CoinButton;