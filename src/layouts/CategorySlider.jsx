import React, { useRef } from "react";
import categories from "../json/categories.json";
import styles from "../styles/CategorySlider.module.css";

const CategorySlider = () => {
  const containerRef = useRef(null);

  const smoothScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const boxWidth = container.offsetWidth / categories.length;
      const scrollFraction = 5; // Adjust this value to control the scrolling distance
      const scrollStep =
        direction === "left"
          ? -boxWidth * scrollFraction
          : boxWidth * scrollFraction;
      container.scrollTo({
        left: container.scrollLeft + scrollStep,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => smoothScroll("left")}
        className={`${styles.prev} ${styles.btn}`}
      >
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
          <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
        </svg>
      </button>

      <div
        className={styles.category_box_container}
        ref={containerRef}
        style={{
          overflowX: "auto",
          display: "flex",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((product) => (
          <div key={product.id} className={styles.category_box}>
            <span className={styles.bg_circle}></span>
            <img src={product.image} alt={product.title} />
            <p className={styles.title}>{product.title}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => smoothScroll("right")}
        className={`${styles.next} ${styles.btn}`}
      >
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
          <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
        </svg>{" "}
      </button>
    </div>
  );
};

export default CategorySlider;
