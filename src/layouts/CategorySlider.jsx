import React, { useRef } from "react";
import { Link } from "react-router-dom";
import categories from "../json/categories.json";
import styles from "../styles/CategorySlider.module.css";
import formatURL from "../utils/formatURL";

const CategorySlider = () => {

  const containerRef = useRef(null);
  let startX;
  let scrollLeft;
  let selected;

  const handleMouseDown = (e) => {
    selected = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
    console.log(startX)
  }

  const handleMouseUp = () => {
    selected = false;
  }

  const handleMouseMove = (e) => {
    if (!selected) return;
    e.preventDefault()
    const x = (e.pageX - containerRef.current.offsetLeft);
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }



  return (
    <div className={styles.container}>


      <div
        className={styles.category_box_container}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          overflowX: "auto",
          display: "flex",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((product) => (
          <Link style={{ textDecoration: "none" }} to={formatURL(`/search?query=${product.type}`)} key={product.id} className={styles.category_box}>
            <span className={styles.bg_circle}></span>
            <img src={product.image} alt={product.title} />
            <p className={styles.title}>{product.title}</p>
          </Link>
        ))}
      </div>


    </div>
  );
};

export default CategorySlider;
