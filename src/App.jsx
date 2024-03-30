import React from "react";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SideNavbar from "./layouts/SideNavbar";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SearchResults from "./pages/SearchResults";

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/about",
      element:<><Navbar/><About/></>
    },
    {
      path:"/product/:id",
    element:<><Navbar/><Product/></>
    },
    {
      path:"/search/:query",
    element:<><Navbar/><SearchResults/></>
    }
  ])
  return (
    <div className="app">
    {/* <Navbar /> */}
    <RouterProvider router={router}/>
    <Footer />
  </div>
  
  );
};

export default App;
