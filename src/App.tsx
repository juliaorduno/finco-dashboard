import { Route, Routes } from "react-router-dom";

import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LoginPage } from "./pages/login-page";
import { Provider } from "react-redux";
import { store } from "./store";
import { TransactionsPage } from "./pages/transactions-page";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
