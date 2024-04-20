import React, { Suspense, lazy, useContext, useEffect } from "react";
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

const About = lazy(() => import("./pages/About"));
const Gift = lazy(() => import("./pages/Gift"));
const Home = lazy(() => import("./pages/Home"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Support = lazy(() => import("./pages/Support"));
const ViewProduct = lazy(() => import("./pages/ViewProduct"));


const App = () => {
  const location = useLocation();

  const { showLogin, showRegister, showProfile, showCart, openSearchPage, showSideNavbar, showFilters,
    setShowLogin, setShowRegister, setShowProfile, setShowCart, setOpenSearchPage, setShowSideNavbar, setShowFilters } = useContext(AppContext)

  useEffect(() => {
    if (showLogin || showFilters || showRegister || showProfile || showCart || openSearchPage || showSideNavbar) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "scroll"
    }
  }, [showLogin, showRegister, showCart, openSearchPage, showSideNavbar, showProfile, showFilters])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    setShowLogin(false)
    setShowRegister(false)
    setShowProfile(false)
    setShowCart(false)
    setOpenSearchPage(false)
    setShowSideNavbar(false)
    setShowFilters(false)
  }, [location])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])





  return (
    <div className="app">
      <Navbar />
      <div className="app_content">
        <SideNavbar />
        <Cart />
        <MobileSearchPage />
        <Suspense fallback={<div className="lll_con" style={{ width: "100%", height: "100dvh", background: "var(--primary-background)" }}>
          <div className="loader-spinner"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products/:type/:name" element={<ViewProduct />} />
            <Route path="/gift" element={<Gift />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Suspense>
        {showLogin ? <Login /> : null}
        {showRegister ? <Register /> : null}
        {showProfile ? <UserDetails /> : null}

        <Footer />
      </div>
    </div>

  );
};

export default App;
