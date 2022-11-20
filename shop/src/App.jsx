import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


import Landing from './pages/Landing'

import { CartProvider} from './CartContext'
import { fetchShopItems } from "./assets/shopItems";
function App() {
  const [payload, setPayload] = useState({})
  const loadContext =()=>{
    fetchShopItems().then(r =>{
      // let updatedArry = r.items.map(item=>{
      //   let columns =Object.keys(item)
      //   if(!columns.includes("website_image")){
      //     item["website_image"] = null
      //   }
      //   return item;
      // })
      setPayload((prevState)=>r)
    })
  }
  useEffect(()=>{
    loadContext();
  },[])

  return (
    <div className="App">
    
        <Router>
          <Routes>
          <Route path="/" exact element={<CartProvider><Landing cartPayload={payload}   /></CartProvider>} />
          <Route path="/shop" exact element={<CartProvider><Landing cartPayload={payload}  /></CartProvider>} />        
          </Routes>
        </Router>
       
    </div>
  );
}


export default App;
