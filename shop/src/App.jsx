import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { authDetails } from "./assets/auth";

import Landing from "./pages/Landing";

import CartContext, { CartProvider } from "./CartContext";
import { fetchShopItems } from "./assets/shopItems";
function App() {
  const [payload, setPayload] = useState({});
  const [globalAccess, setGLobalAccess] = useState(null);
  const loadContext = () => {
    //const k = await loadKeys();
    fetchShopItems().then((r) => {
      setPayload((prevState) => r);
    });
  };

  const loadKeys = () => {
    authDetails().then((k) => {
      setGLobalAccess((prevState) => k);
    });
  };

  useEffect(() => {
    loadKeys();
    loadContext();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <CartProvider>
                {/* <Landing cartPayload={payload} /> */}
                <Landing cartPayload={payload} keys={globalAccess} />
              </CartProvider>
            }
          />
          <Route
            path="/shop"
            exact
            element={
              <CartProvider>
                <Landing cartPayload={payload} keys={globalAccess} />
              </CartProvider>
            }
          />
          <Route
            path="/timex"
            exact
            element={
              <CartProvider>
                <Landing cartPayload={payload} keys={globalAccess} />
              </CartProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
