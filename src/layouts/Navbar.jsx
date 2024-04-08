import React, { useContext, useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { AppContext } from "../context/Context";
import styles from "../styles/Navbar.module.css";
import formatURL from "../utils/formatURL";


const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const q = new URLSearchParams(location.search);
  const { setShowSideNavbar } = useContext(AppContext);
  const getSearchRequestText = q.get("query");
  const { setOpenSearchPage, setShowCart, user, cartItemsLength, setShowLogin, setShowProfile } =
    useContext(AppContext);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      setQuery(getSearchRequestText);
      return;
    }
    setQuery("")
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const searchQueryOnType = (e) => {
    if (query.trim() === "") {
      return navigate("/");
    }
    if (e.key === "Enter") {
      navigate(formatURL(`/search?query=${query}`));
    }
  };

  const buttonSearch = () => {
    if (query.trim() === "") {
      navigate("/");
    } else {
      navigate(formatURl(`/search?query=${query}`));
    }
  };

  return (
    <nav className={styles.container} style={{ position: location.pathname.startsWith("/products") ? "relative" : "fixed" }}>
      <div className={styles.part_one}>
        <div className={styles.ran}>
          <CiMenuBurger onClick={() => setShowSideNavbar(true)} />
          <img src="/public/images/logo.png" alt="" />
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
         <li>
            <Link to={"/search?query=all"}>Explore Products</Link>
          </li>
          <li>
            <Link to="/about">About boAt</Link>
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
