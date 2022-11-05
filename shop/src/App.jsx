import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";


import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FrappeProvider>
        <Router>
          <Routes>
          <Route path="/" exact element={<Landing />} />
          </Routes>
        </Router>
        </FrappeProvider> 
    </div>
  );
}

export default App;
