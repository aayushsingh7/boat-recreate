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
  // const router = createBrowserRouter([
  //   {
  //     path:"/",
  //     element:<><SideNavbar/><Navbar/><Home/></>
  //   },
  //   {
  //     path:"/about",
  //     element:<><SideNavbar/><Navbar/><About/></>
  //   },
  //   {
  //     path:"/product/:id",
  //   element:<><SideNavbar/><Navbar/><Product/></>
  //   },
  //   {
  //     path:"/search/:query",
  //   element:<><SideNavbar/><Navbar/><SearchResults/></>
  //   }
  // ])
  return (
    <div className="app">
    <Navbar />
    <SideNavbar/>
    <MobileSearchPage/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/search" element={<SearchResults/>} />
      {/* <Route path="/" element={<Home/>} /> */}
    </Routes>
    {/* <RouterProvider router={router}/> */}
    <Footer />
  </div>
  
  );
};

export default App;
