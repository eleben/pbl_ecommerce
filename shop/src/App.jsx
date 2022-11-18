import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { FrappeProvider, useFrappeAuth } from "frappe-react-sdk";


import Landing from './pages/Landing'

import { CartProvider} from './CartContext'
function App() {

  return (
    <div className="App">
    
        <Router>
          <Routes>
          <Route path="/shop" exact element={<CartProvider><Landing  /></CartProvider>} />
          
          </Routes>
        </Router>
       
    </div>
  );
}


export default App;
