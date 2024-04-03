import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/SideNavbar.module.css";
import { HiOutlineHome } from "react-icons/hi";
import { TbHeadphones } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { AppContext } from "../context/Context";
import { AiOutlineClose } from "react-icons/ai";

const SideNavbar = () => {
  const { showSideNavbar, setShowSideNavbar, getUserDetails } =
    useContext(AppContext);
  useEffect(() => {
    if (showSideNavbar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [showSideNavbar]);

  return (
    <>
      <div
        onClick={() => setShowSideNavbar(false)}
        className={`${styles.shadow} ${
          showSideNavbar ? styles.show_shadow : styles.hide_shadow
        }`}
      ></div>
      <nav
        className={`${styles.container} ${
          showSideNavbar ? styles.show : styles.hide
        }`}
      >
        <div className={styles.logo}>
          <img src="/images/dark-logo.png" />
          <AiOutlineClose
            className={styles.close}
            onClick={() => setShowSideNavbar(false)}
          />
        </div>

        <ul className={styles.options_container}>
          <div className={styles.part_one}>
            <Link onClick={() => setShowSideNavbar(false)} to={"/"}>
              <li>
                <HiOutlineHome /> Home
              </li>
            </Link>
            <Link
              onClick={() => setShowSideNavbar(false)}
              to={"/search?query=all"}
            >
              <li>
                <TbHeadphones /> Explore Products
              </li>
            </Link>
            <Link onClick={() => setShowSideNavbar(false)} to={"/about"}>
              <li>
                <FaRegBuilding
                  style={{ fontSize: "22px", marginRight: "23px" }}
                />{" "}
                About bo
                <span
                  style={{
                    color: "var(--secondary-background)",
                    fontWeight: "600",
                    position: "relative",
                    top: "1px",
                  }}
                >
                  A
                </span>
                t
              </li>
            </Link>
            <Link onClick={() => setShowSideNavbar(false)} to={"/contact"}>
              <li>
                <IoMailOutline /> Contact Us
              </li>
            </Link>
          </div>
          <Link
            onClick={() => {
              setShowSideNavbar(false);
              localStorage.removeItem("user_details");
              getUserDetails();
            }}
            to={"/"}
          >
            <li>
              <IoLogOut /> Logout
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default SideNavbar;
