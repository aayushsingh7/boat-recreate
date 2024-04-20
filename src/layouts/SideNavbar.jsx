import React, { useContext } from "react";
import { AiFillGift, AiOutlineClose } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { IoLogOut, IoMail } from "react-icons/io5";
import { TbHeadphones } from "react-icons/tb";
import { Link } from "react-router-dom";
import Animate from "../animation/Animate";
import { AppContext } from "../context/Context";
import styles from "../styles/SideNavbar.module.css";

const SideNavbar = () => {

  const { showSideNavbar, setShowSideNavbar, getUserDetails } =
    useContext(AppContext);


  return (
    <>
      <div
        onClick={() => setShowSideNavbar(false)}
        className={`${styles.shadow} ${showSideNavbar ? styles.show_shadow : styles.hide_shadow
          }`}
      ></div>
      <nav
        className={`${styles.container} ${showSideNavbar ? styles.show : styles.hide
          }`}
      >
        <div className={styles.logo}>
          <img src="/images/dark-logo.png" alt="Logo" />
          <AiOutlineClose
            className={styles.close}
            onClick={() => setShowSideNavbar(false)}
          />
        </div>

        <menu className={styles.options_container}>
          <ul className={styles.part_one}>
            <li>
              <Animate overflowHidden={false} delay={0.05} type="leftToRight">
                <Link title="Go to home page" to={"/"}>
                  <HiOutlineHome /> Home
                </Link>
              </Animate>
            </li>


            <li>
              <Animate overflowHidden={false} type="leftToRight" delay={0.15}>
                <Link
                  title="Search all products"
                  onClick={() => setShowSideNavbar(false)}
                  to={"/search?query=all"}
                >
                  <TbHeadphones /> Explore Products
                </Link>
              </Animate>
            </li>

            <li>
              <Animate overflowHidden={false} type="leftToRight" delay={0.25}>
                <Link title="Go to about page" onClick={(e) => setShowSideNavbar(false)} to={"/about"}>
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
                </Link>
              </Animate>
            </li>

            <li>
              <Animate overflowHidden={false} type="leftToRight" delay={0.35}>
                <Link title="Go to gift with boat page" onClick={(e) => setShowSideNavbar(false)} to={"/gift"}>
                  <AiFillGift />
                  Gift with boAt
                </Link>
              </Animate>
            </li>

            <li>
              <Animate overflowHidden={false} type="leftToRight" delay={0.45}>
                <Link title="Go to boat support" onClick={(e) => setShowSideNavbar(false)} to={"/support"}>
                  <IoMail /> boAt Support
                </Link>
              </Animate>
            </li>
          </ul>

          <li>
            <Animate overflowHidden={false} type="leftToRight" delay={0.55}>
              <Link
                title="Logout"
                onClick={() => {
                  setShowSideNavbar(false);
                  localStorage.removeItem("user_details");
                  getUserDetails();
                }}
                to={"/"}
              >
                <IoLogOut /> Logout
              </Link>
            </Animate>
          </li>
        </menu>
      </nav>
    </>
  );
};

export default SideNavbar;
