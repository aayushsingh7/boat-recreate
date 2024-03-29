import React from "react";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SideNavbar from "./layouts/SideNavbar";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <SideNavbar /> */}
      <Home />
      <div className="add-padding-container">
      <Products />
      <Features />
      <About />
      <Contact />
      <Footer />
      </div>
    </>
  );
};

export default App;
