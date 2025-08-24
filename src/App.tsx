import AppProvider from "@application/context/App-Provider";
import AppRoutes from "@application/routes/AppRoutes";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
