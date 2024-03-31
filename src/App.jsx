import React from "react";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SideNavbar from "./layouts/SideNavbar";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import {Routes,Route} from 'react-router-dom'
import SearchResults from "./pages/SearchResults";
import MobileSearchPage from "./layouts/MobileSearchPage";

const App = () => {

  return (
    <div className="app">
    <Navbar />
    <SideNavbar/>
    <MobileSearchPage/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/search" element={<SearchResults/>} />
    </Routes>
    <Footer />
  </div>
  
  );
};

export default App;
