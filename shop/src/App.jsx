import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";


import Landing from './pages/Landing'

import { CartProvider} from './CartContext'
function App() {
 

  return (
    <div className="App">
      <FrappeProvider url="http://dev.pbl.com">
        <Router>
          <Routes>
          <Route path="/shop" exact element={<CartProvider><Landing  /></CartProvider>} />
          
          </Routes>
        </Router>
        </FrappeProvider> 
    </div>
  );
}


export default App;
