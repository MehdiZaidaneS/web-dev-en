// import React from 'react'
// import visa from "./assets/images/visa.png"
// import master from "./assets/images/master.png"



// function CreditCard(props) {
   
//     const last3Digits = props.number.slice(-4);

//     const boxColor = {
//         backgroundColor: props.bgColor,
//         color: props.color,
//         width: "50%"
//     }

//   return (
//     <div style={boxColor}>
//         <img src={props.type === "Visa" ? visa: master} width={50}></img>
//         <p>**** **** **** {last3Digits}</p>
//         <p>Expires {props.expirationMonth}/{props.expirationYear}</p>
//         <p>{props.bank}</p>
//         <p>{props.owner}</p>
//     </div>
//   )
// }

// export default CreditCard

import React from 'react';
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
        <img
          src={props.type === "Visa" ? visa : master}
          alt={props.type}
          className="card-logo"
        />
      </div>
      <div className="card-number">**** **** **** {last4Digits}</div>
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
