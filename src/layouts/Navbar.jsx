import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { AppContext } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";


const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const q = new URLSearchParams(location.search);
  const { setShowSideNavbar } = useContext(AppContext);
  const [showProfile,setShowProfile] = useState(false)
  const getSearchRequestText = q.get("query");
  const { setOpenSearchPage,setShowCart, user, cartItemsLength, setShowLogin } =
    useContext(AppContext);

  useEffect(() => {
    setQuery(getSearchRequestText);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const searchQueryOnType = (e) => {
    if (query.trim() === "") {
      return navigate("/");
    }
    if (e.key === "Enter") {
      navigate(`/search?query=${query}`);
    }
  };

  const buttonSearch = () => {
    if (query.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <nav className={styles.container}>
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
          <button
            className={styles.search_icon_mob}
            onClick={() => setOpenSearchPage(true)}
          >
            <IoIosSearch style={{ fontSize: "30px" }} />
          </button>
          <button onClick={() => user ? null : setShowLogin(true)} onMouseEnter={()=> setShowProfile(true)} onMouseLeave={()=> setShowProfile(false)}>
            <FaRegUser style={{ fontSize: "23px" }} />
            {
              showProfile && user ? 
              <div
              className={styles.user_profile}
              onClick={(e) => e.stopPropagation()}
            >
              <FaUserCircle />
              <div>
                <p>
                  <span><IoMail/></span> aayushsingh@gmail.com
                </p>
                <p>
                  <span><RiLockPasswordFill/></span> ×××××××××××××
                </p>
                <button>Logout</button>
              </div>
            </div>  : null
            }
          </button>
          <button onClick={() => setShowCart(true)}>
            {cartItemsLength?.length > 0 ? (
              <span className={styles.cart_length}>
                {cartItemsLength?.length}
              </span>
            ) : null}
            <IoCartOutline style={{ fontSize: "31px" }} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
