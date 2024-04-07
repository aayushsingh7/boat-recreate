import React, { useContext, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { AppContext } from "./context/Context";
import Cart from "./layouts/Cart";
import Footer from "./layouts/Footer";
import Login from "./layouts/Login";
import MobileSearchPage from "./layouts/MobileSearchPage";
import Navbar from "./layouts/Navbar";
import Register from "./layouts/Register";
import SideNavbar from "./layouts/SideNavbar";
import UserDetails from "./layouts/UserDetails";
import About from "./pages/About";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ViewProduct from "./pages/ViewProduct";

const App = () => {
  
 const {showLogin,showRegister,showProfile,showCart,openSearchPage, showSideNavbar,} = useContext(AppContext)

 useEffect(()=> {
  if(showLogin || showRegister || showProfile || showCart || openSearchPage || showSideNavbar){
    document.body.style.overflowY = "hidden"
  }else{
    document.body.style.overflowY = "scroll"
  }
 },[showLogin,showRegister,showCart,openSearchPage, showSideNavbar,showProfile])


  return (
    <div className="app">
    <Navbar />
    <div className="app_content">
    <SideNavbar/>
    <Cart/>
    <MobileSearchPage/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/search" element={<SearchResults/>} />
      <Route path="/products/:type/:name" element={<ViewProduct/>}/>
    </Routes>
   {showLogin ?  <Login/>:null}
   {showRegister ? <Register/> : null}
   {showProfile ? <UserDetails/> : null}
    <Footer />
    </div>
  </div>
  
  );
};

export default App;
