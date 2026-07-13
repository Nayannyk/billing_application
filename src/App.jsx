import React from "react";
import Routes from "./Routes";
import { CustomerProvider } from "./context/CustomerContext";
import { BillProvider } from "./context/BillContext";
import { ServiceProvider } from "./context/ServiceContext";

function App() {
  return (
    <ServiceProvider>
      <CustomerProvider>
        <BillProvider>
          <Routes />
        </BillProvider>
      </CustomerProvider>
    </ServiceProvider>
  );
}

export default App;
