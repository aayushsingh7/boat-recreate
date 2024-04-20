import React, { useContext, useEffect, useRef, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Animate from "../animation/Animate";
import Button from "../components/Button";
import { AppContext } from "../context/Context";
import styles from "../styles/Navbar.module.css";
import formatURL from "../utils/formatURL";
import textFormatter from "../utils/textFormatter";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let viewPortHeight;
  let currentYPosition;
  let removeBgRoutes = location.pathname === "/";
  const [changeBg, setChangeBg] = useState(false);
  const [query, setQuery] = useState("");
  const q = new URLSearchParams(location.search);
  const { setShowSideNavbar } = useContext(AppContext);
  const getSearchRequestText = q.get("query");
  const {
    setOpenSearchPage,
    setShowCart,
    user,
    cartItemsLength,
    setShowLogin,
    setShowProfile,
  } = useContext(AppContext);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      setQuery(textFormatter(getSearchRequestText));
      return;
    }
    setQuery("");
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

      return navigate("/");

    } else {
      navigate(formatURL(`/search?query=${query}`));
    }
  };

  const handleNavbarStyling = () => {
    if (!navbarRef.current) return;
    viewPortHeight = 0;
    currentYPosition = 0;
    if (!removeBgRoutes) {
      navbarRef.current.style.background = "var(--primary-background)";
      navbarRef.current.style.borderBottom =
        "1px solid var(--mid-dark-background)";
      return;
    }
    viewPortHeight = window.innerHeight - 70;
    currentYPosition =
      Math.floor(window.scrollY) - navbarRef.current.offsetLeft;
    if (viewPortHeight < currentYPosition) {
      setChangeBg(true);
      navbarRef.current.style.background = "var(--primary-background)";
      navbarRef.current.style.borderBottom =
        "1px solid var(--mid-dark-background)";
    } else {
      setChangeBg(false);
      navbarRef.current.style.background = "none";
      navbarRef.current.style.borderBottom = "none";
    }
  };

  onscroll = () => {
    handleNavbarStyling();
  };

  useEffect(() => {
    handleNavbarStyling();
  }, [location]);




  return (
    <nav
      ref={navbarRef}
      className={styles.container}
      style={{
        position:
          location.pathname.startsWith("/products")
            ? "relative"
            : "fixed",
      }}
    >

      <div className={styles.part_one}>
        <div className={styles.ran}>
          <CiMenuBurger onClick={() => setShowSideNavbar(true)} />
          <Animate type={"topToBottom"} deplay={0.5}>
            {" "}
            <Link title="Go to home page" to={"/"}>
              {" "}
              <img src="/images/logo.png" alt="" />
            </Link>
          </Animate>
        </div>
        <ul>
          <li>
            <Animate type={"topToBottom"} delay={0.1}>
              {" "}
              <Link title={`Search all products`} to={"/search?query=all"}>Explore Products </Link>
            </Animate>
          </li>
          <li>
            <Animate type={"topToBottom"} delay={0.15}>
              <Link title="Go to about page" to="/about">About boAt</Link>
            </Animate>
          </li>
          <li>
            <Animate type={"topToBottom"} delay={0.2}>
              <Link title="Go to git with boat page" to="/gift" >Gift with boAt</Link>
            </Animate>
          </li>
          <li>
            <Animate type={"topToBottom"} delay={0.25}>
              <Link title="Go to boat support" to="/support" >Support</Link>
            </Animate>
          </li>
        </ul>
      </div>

      <div className={styles.part_two}>
        <Animate type={"topToBottom"} delay={0.3} width={"100%"} shrink={true}>
          <div style={{ position: "relative" }} className={styles.input_div}>
            <input
              placeholder="Search headphones"
              type="text"
              value={query}
              autoComplete="off"
              onKeyDown={searchQueryOnType}
              style={{
                background:
                  !removeBgRoutes || changeBg
                    ? "var(--mid-dark-background)"
                    : "#0000004a",
              }}
              onInput={(e) => setQuery(e.target.value)}
            />
            <IoIosSearch
              className={styles.search_icon}
              style={{ cursor: "pointer" }}
              onClick={buttonSearch}
            />
          </div>
        </Animate>
        <div className={styles.main_option}>
          <Animate type={"topToBottom"} delay={0.3}>
            <Button
              label={"Open search page"}
              background="none"
              margin="0px 6px"
              padding="5px"
              fontSize="0.8rem"
              text={<IoIosSearch style={{ fontSize: "30px" }} />}
              className={styles.search_icon_mob}
              onClick={() => setOpenSearchPage(true)}
            />
          </Animate>

          <Animate type={"topToBottom"} delay={0.35}>
            <Button
              label={user && user?.id !== "default_user_id" ? "View Profile" : "Login"}
              background="none"
              margin="0px 6px"
              padding="5px"
              fontSize="0.8rem"
              onClick={() =>
                user && user?.id !== "default_user_id"
                  ? setShowProfile(true)
                  : setShowLogin(true)
              }
              text={<FaRegUser style={{ fontSize: "23px" }} />}
            />
          </Animate>

          <Animate type={"topToBottom"} delay={0.4}>
            <Button
              label={"View cart"}
              background="none"
              margin="0px 6px"
              padding="5px"
              fontSize="0.8rem"
              position="relative"
              onClick={() => setShowCart(true)}
              text={
                <>
                  {cartItemsLength?.length > 0 ? (
                    <span className={styles.cart_length}>
                      {cartItemsLength?.length}
                    </span>
                  ) : null}
                  <IoCartOutline style={{ fontSize: "31px" }} />
                </>
              }
            />
          </Animate>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
