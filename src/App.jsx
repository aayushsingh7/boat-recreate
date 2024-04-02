import React, { useContext, useEffect } from "react";
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
import Cart from "./layouts/Cart";
import Login from "./layouts/Login";
import { AppContext } from "./context/Context";

const App = () => {
 const {showLogin,showRegister} = useContext(AppContext)
 useEffect(()=> {
  if(showLogin || showRegister){
    document.body.style.overflowY = "hidden"
  }else{
    document.body.style.overflowY = "scroll"
  }
 },[showLogin,showRegister])
  return (
    <div className="app">
    <Navbar />
    <SideNavbar/>
    <Cart/>
    <MobileSearchPage/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/search" element={<SearchResults/>} />
    </Routes>
   {showLogin ?  <Login/>:null}
    <Footer />
  </div>
  
  );
};

export default App;
