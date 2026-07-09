import React from "react";
import Routes from "./Routes";
import { CustomerProvider } from "./context/CustomerContext";

function App() {
  return (
    <CustomerProvider>
      <Routes />
    </CustomerProvider>
  );
}

export default App;
