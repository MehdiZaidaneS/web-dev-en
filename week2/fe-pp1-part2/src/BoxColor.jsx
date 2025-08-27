// import React from 'react'

// function BoxColor(props) {    
//     const boxStyle ={
//         backgroundColor: `rgb(${props.r},${props.g},${props.b})`
//     }

//     function rgbToHex(r, g ,b){
//        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
//     }

//     function toHex(color){

//     }

//   return (
//     <div style={boxStyle} id="box">
//         <p>rgb({props.r},{props.g},{props.b})</p>
//         <p></p>
//     </div>
//   )
// }

// export default BoxColor

import React from 'react';

function BoxColor(props) {
  const { r, g, b } = props;

  const boxStyle = {
    backgroundColor: `rgb(${r},${g},${b})`,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    textAlign: 'center',
    color: getContrastColor(r, g, b),
    fontFamily: 'Segoe UI, sans-serif',
    width: '250px',
    margin: '20px auto'
  };

  function rgbToHex(r, g, b) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function toHex(color) {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }


  return (
    <div style={boxStyle} id="box">
      <p style={{ margin: 0 }}>rgb({r},{g},{b})</p>
      <p style={{ margin: 0 }}>{rgbToHex(r, g, b)}</p>
    </div>
  );
}

export default BoxColor;
