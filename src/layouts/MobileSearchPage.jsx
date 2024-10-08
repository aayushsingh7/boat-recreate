import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import categories from "../json/categories.json";
import styles from "../styles/MobileSearchPage.module.css";
import formatURL from "../utils/formatURL";

const MobileSearchPage = () => {

  const { openSearchPage, setOpenSearchPage } = useContext(AppContext);

  const [query, setQuery] = useState("");
  const q = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const inputRef = useRef(null)

  useEffect(() => {
    if (openSearchPage) {
      inputRef.current.focus()
    }
    setQuery(q.get("query"));
  }, [openSearchPage]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpenSearchPage(false);
    if (query.trim() === "") {
      inputRef.current.blur()
      return navigate("/");
    }
    navigate(formatURL(`/search?query=${query}`));
    inputRef.current.blur()
  };


  return (
    <>
      <div
        onClick={() => setOpenSearchPage(false)}
        className={`${styles.shadow} ${openSearchPage ? styles.show_shadow : styles.hide_shadow
          }`}
      ></div>
      <div
        className={`${styles.container} ${openSearchPage ? styles.show : styles.hide
          }`}
      >
        <div className={styles.part_one}>
          <AiOutlineArrowLeft
            className={styles.return}
            onClick={(e) => {
              setOpenSearchPage(false);
            }}
          />
          <form onSubmit={handleFormSubmit} style={{ width: "90%" }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search headphones, earphones, etc"
              value={query || ""}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          )
        </div>

        <div className={styles.suggested_container}>
          <h2>Search by category</h2>
          Wireless Earbuds Wireless Earbuds
          <div className={styles.category_box_container}>
            {categories.map((product) => (
              <div
                key={product.id}
                className={styles.category_box}
                onClick={() => {
                  navigate(formatURL(`/search?query=${product.type}`));
                  setOpenSearchPage(false);
                }}
              >
                <span className={styles.bg_circle}></span>
                <img src={product.image} alt={product.title} />
                <p className={styles.title}>{product.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSearchPage;
