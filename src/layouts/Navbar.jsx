import React, { useContext, useEffect, useRef, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { AppContext } from "../context/Context";
import styles from "../styles/Navbar.module.css";
import formatURL from "../utils/formatURL";
import textFormatter from "../utils/textFormatter";


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate();
  let viewPortHeight;
  let currentYPosition;
  let removeBgRoutes = location.pathname === "/"
  const [changeBg, setChangeBg] = useState(false)
  const [query, setQuery] = useState("");
  const q = new URLSearchParams(location.search);
  const { setShowSideNavbar } = useContext(AppContext);
  const getSearchRequestText = q.get("query");
  const { setOpenSearchPage, setShowCart, user, cartItemsLength, setShowLogin, setShowProfile } =
    useContext(AppContext);
  const navbarRef = useRef(null)

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      setQuery(textFormatter(getSearchRequestText));
      return;
    }
    setQuery("")
  }, [location.search]);

  const searchQueryOnType = (e) => {
    if (e.key === "Enter") {
      if (query.trim() === "") {
        return navigate("/");
      }
      navigate(formatURL(`/search?query=${query}`));
    }
  };

  const buttonSearch = () => {
    if (query.trim() === "") {
      navigate("/");
    } else {
      navigate(formatURL(`/search?query=${query}`));
    }
  };


  const handleNavbarStyling = ()=> {
    viewPortHeight = 0
    currentYPosition = 0
    if(!removeBgRoutes) return navbarRef.current.style.background = "var(--primary-background)"
    viewPortHeight = window.innerHeight - 70;
    currentYPosition = Math.floor(window.scrollY) - navbarRef.current.offsetLeft;
    if (viewPortHeight < currentYPosition) {
      setChangeBg(true)
      navbarRef.current.style.background = "var(--primary-background)"
    } else {
      setChangeBg(false)
      navbarRef.current.style.background = "none"
    }
  }

  onscroll = () => {
  handleNavbarStyling()
  }

  useEffect(()=> {
    handleNavbarStyling()
  },[location])

  return (
    <nav ref={navbarRef} className={styles.container} style={{ position: location.pathname.startsWith("/products") || location.pathname.startsWith("/support") ? "relative" : "fixed", backdropFilter: location.pathname.startsWith("/support") ? "none" : "blur(100px)", borderBottom:!removeBgRoutes ||  changeBg ? "1px solid var(--mid-dark-background)" : "none" }}>
      <div className={styles.part_one}>
        <div className={styles.ran}>
          <CiMenuBurger onClick={() => setShowSideNavbar(true)} />
          <Link to={"/"}>  <img src="/public/images/logo.png" alt="" /></Link>
        </div>
        <ul>
          {/* <li className={location.pathname === "/" ? styles.active : styles.default}>
            <Link to="/">Home</Link>
          </li> */}
          <li>
            <Link to={"/search?query=all"}>Explore Products</Link>
          </li>
          <li>
            <Link to="/about">About boAt</Link>
          </li>
          <li >
            <Link to="/gift">Gift with boAt</Link>
          </li>
          <li >
            <Link to="/support">Support</Link>
          </li>

        </ul>
      </div>

      <div className={styles.part_two}>
        <div style={{ position: "relative" }} className={styles.input_div}>
          <input
            placeholder="Search headphones"
            type="text"
            value={query}
            autoComplete="off"
            onKeyDown={searchQueryOnType}
            style={{ background: !removeBgRoutes || changeBg ? "var(--mid-dark-background)" : "#0000004a" }}
            onInput={(e) => setQuery(e.target.value)}
          />
          <IoIosSearch
            className={styles.search_icon}
            style={{ cursor: "pointer" }}
            onClick={buttonSearch}
          />
        </div>
        <div className={styles.main_option}>

          <Button background="none" margin="0px 6px" padding="5px" fontSize="0.8rem"
            text={<IoIosSearch style={{ fontSize: "30px" }} />}
            className={styles.search_icon_mob}
            onClick={() => setOpenSearchPage(true)}
          />


          <Button background="none" margin="0px 6px" padding="5px" fontSize="0.8rem" onClick={() => user && user?.id !== "default_user_id" ? setShowProfile(true) : setShowLogin(true)} text={<FaRegUser style={{ fontSize: "23px" }} />} />

          <Button background="none" margin="0px 6px" padding="5px" fontSize="0.8rem" position="relative" onClick={() => setShowCart(true)}
            text={
              <>
                {cartItemsLength?.length > 0 ? (
                  <span className={styles.cart_length}>
                    {cartItemsLength?.length}
                  </span>
                ) : null}
                <IoCartOutline style={{ fontSize: "31px" }} />
              </>}
          />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
