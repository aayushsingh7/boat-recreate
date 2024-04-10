import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
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
import Gift from "./pages/Gift";
import Support from "./pages/Support";

const App = () => {
  const location = useLocation();
  
 const {showLogin,showRegister,showProfile,showCart,openSearchPage, showSideNavbar,showFilters,
setShowLogin,setShowRegister,setShowProfile,setShowCart,setOpenSearchPage,setShowSideNavbar,setShowFilters                                                                                        } = useContext(AppContext)

 useEffect(()=> {
  if(showLogin || showFilters || showRegister || showProfile || showCart || openSearchPage || showSideNavbar){
    document.body.style.overflowY = "hidden"
  }else{
    document.body.style.overflowY = "scroll"
  }
 },[showLogin,showRegister,showCart,openSearchPage, showSideNavbar,showProfile,showFilters])

 useEffect(()=> {
     window.scrollTo({top:0,behavior:"instant"})
    setShowLogin(false)
    setShowRegister(false)
    setShowProfile(false)
    setShowCart(false)
    setOpenSearchPage(false)
    setShowSideNavbar(false)
    setShowFilters(false)
 },[location])



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
      <Route path="/gift" element={<Gift/>} />
      <Route path="/support" element={<Support/>} />
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
