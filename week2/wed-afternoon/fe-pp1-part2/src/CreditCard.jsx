import visa from "./assets/images/visa.png";
import master from "./assets/images/master.png";
import './CreditCard.css';

function CreditCard(props) {
  const last4Digits = props.number.slice(-4);

  return (
    <div
      className="credit-card"
      style={{ backgroundColor: props.bgColor, color: props.color }}
    >
      <div className="card-header">
        <img src={props.type === "Visa" ? visa : master} className="card-logo" />
      </div>

      <div className="card-number">**** **** **** {last4Digits}
      </div>

      <div className="card-info">
        <span className="card-expiry">
          Expires {props.expirationMonth}/{props.expirationYear}
        </span>
        <span className="card-bank">{props.bank}</span>
      </div>

      <div className="card-owner">{props.owner}</div>

    </div>
  );
}

export default CreditCard;
