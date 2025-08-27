import React from "react";

function Greetings(props) {
  let greeting;

  switch (props.lang) {
    case "fi":
      greeting = "Moi";
      break;
    case "de":
      greeting = "Halloo";
      break;
    case "en":
      greeting = "Hello";
      break;
    case "es":
      greeting = "Hola";
      break;
    case "fr":
      greeting = "Bonjour";
      break;
    default:
      greeting = "Language not available";
  }

  return (
    <div
      style={{
        backgroundColor: "#f0f4ff",
        padding: "15px 20px",
        borderRadius: "12px",
        maxWidth: "300px",
        margin: "20px auto",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <p>{greeting} <span style={{ color: "#0077cc" }}>{props.children}</span></p>
    </div>
  );
}

export default Greetings;
