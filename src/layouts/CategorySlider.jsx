import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Animate from '../animation/Animate';
import categories from "../json/categories.json";
import styles from "../styles/CategorySlider.module.css";
import formatURL from "../utils/formatURL";
import { AppContext } from "../context/Context";

const CategorySlider = () => {


  const containerRef = useRef(null);
  let startX;
  let scrollLeft;
  let selected;

  const handleMouseDown = (e) => {
    selected = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
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
        {categories.map((product, index) => (
          <Animate key={product.id} delay={index * 0.05} overflowHidden={false} type="rightToLeft">
            <Link title={`Search ${product.type}`} style={{ textDecoration: "none" }} to={formatURL(`/search?query=${product.type}`)} className={styles.category_box}>
              <div className={styles.img_div}> <img src={product.image} alt={`Shop ${product.type}`} /></div>
              <p className={styles.title}>{product.title}</p>
            </Link>
          </Animate>
        ))}
      </div>


    </div>
  );
};

export default CategorySlider;
