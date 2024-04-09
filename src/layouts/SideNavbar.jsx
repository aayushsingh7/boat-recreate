import React, { useContext } from "react";
import { AiFillGift, AiOutlineClose } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { IoLogOut, IoMailOutline } from "react-icons/io5";
import { TbHeadphones } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Context";
import styles from "../styles/SideNavbar.module.css";

const SideNavbar = () => {
  const { showSideNavbar, setShowSideNavbar, getUserDetails } =
    useContext(AppContext);


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
            <Link onClick={() => setShowSideNavbar(false)} to={"/gift"}>
              <li>
                <AiFillGift/>Gift with boAt
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
