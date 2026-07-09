import React from "react";
import Routes from "./Routes";
import { CustomerProvider } from "./context/CustomerContext";
import { BillProvider } from "./context/BillContext";

function App() {
  return (
    <CustomerProvider>
      <BillProvider>
        <Routes />
      </BillProvider>
    </CustomerProvider>
  );
}

export default App;
