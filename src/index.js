import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { Container, Button, Alert } from "react-bootstrap";
// import { CSSTransition } from "react-transition-group";

// import "./styles.css";

// function Example() {
//   const [showButton, setShowButton] = useState(true);
//   const [showMessage, setShowMessage] = useState(false);
//   return (
//     <Container style={{ paddingTop: "2rem" }}>
//       {showButton && (
//         <Button onClick={() => setShowMessage(true)} size="lg">
//           Show Message
//         </Button>
//       )}
//       <CSSTransition
//         in={showMessage}
//         timeout={300}
//         classNames="alert"
//         unmountOnExit
//         onEnter={() => setShowButton(false)}
//         onExited={() => setShowButton(true)}
//       >
//         <Alert
//           variant="primary"
//           dismissible
//           onClose={() => setShowMessage(false)}
//         >
//           <Alert.Heading>Animated alert message</Alert.Heading>
//           <p>This alert message is being transitioned in and out of the DOM.</p>
//           <Button onClick={() => setShowMessage(false)}>Close</Button>
//         </Alert>
//       </CSSTransition>
//     </Container>
//   );
// }

// ReactDOM.render(<Example />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
