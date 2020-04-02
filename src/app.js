import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import "./App.css";

function App() {
  document.title = "user Directory";
  return (
    <Router>
      <div>
    <Navbar />
    <Wrapper>
 <Route exact path="/" component={HomePage} />
    </Wrapper>
    <Footer />
     </div>
    
    </Router>
  );
}

export default App;