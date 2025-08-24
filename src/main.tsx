import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, HashRouter  } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <HashRouter >
        <App />
      </HashRouter>
    </ChakraProvider>
  </StrictMode>
);
