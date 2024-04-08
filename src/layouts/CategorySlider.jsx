import React, { useRef } from "react";
import categories from "../json/categories.json";
import styles from "../styles/CategorySlider.module.css";
import Button from '../components/Button'
import {AiOutlineRight,AiOutlineLeft} from 'react-icons/ai'

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
     <Button
           onClick={()=> smoothScroll("left")}
           className={`${styles.next}`}
           position="absolute"
           top="50%"
           transform="translateY(-50%)"
           padding="3px"
           width="42px"
           zIndex="10"
       boxShadow="0px 0px 4px 1px #313131"
           borderRadius="50%"
           height="42px"
           background="var(--primary-color)"
         text={ <AiOutlineLeft />} />

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
      <Button
           onClick={()=> smoothScroll("right")}
           className={`${styles.next}`}
           position="absolute"
           top="50%"
           transform="translateY(-50%)"
           padding="3px"
           width="42px"
           zIndex="10"
           boxShadow="0px 0px 4px 1px #313131"
           borderRadius="50%"
           height="42px"
           background="var(--primary-color)"
         text={ <AiOutlineRight />} />

    </div>
  );
};

export default CategorySlider;
