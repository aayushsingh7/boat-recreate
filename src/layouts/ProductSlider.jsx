import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import ProductSliderBox from "../components/ProductSliderBox";
import styles from "../styles/ProductSlider.module.css";
import DealCounter from "./DealCounter";

const ProductSlider = ({ data, type, highlight, tittle, counter, id }) => {



  const sliderRef = useRef(null);
  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [selectedVid, setSelectedVid] = useState(100);

  const updateButtonState = () => {
    const container = sliderRef.current;
    const hasNext =
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1;
    setNextBtn(hasNext);

    const hasPrev = container.scrollLeft > 0;
    setPrevBtn(hasPrev);
  };

  const handleNextClick = () => {
    updateButtonState();
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const handlePrevClick = () => {
    updateButtonState();
    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (sliderRef.current) {
      const ref = sliderRef.current;
      const handleScroll = () => {
        updateButtonState();
      };
      sliderRef.current.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      handleScroll();
      return () => {
        ref.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, []);

  return (
    <section className={styles.sec_tion}>
      {tittle && highlight ? (
        <h2>
          {tittle} <span className={styles.under_line}>{`${highlight}`}</span>
        </h2>
      ) : null}

      {counter ? (
        <DealCounter />
      ) : null}
      <div className={styles.slider}>
        {prevBtn ? (
          <button
            onClick={handlePrevClick}
            className={`${styles.prev} ${styles.btn}`}
          >
            <AiOutlineLeft />
          </button>
        ) : null}

        <div className={styles.slider_container} ref={sliderRef}>
          {data.filter((product)=> id ? product.id !== id : true).map((product, index) => {
            return (
             <ProductSliderBox selectedVid={selectedVid} setSelectedVid={setSelectedVid} index={index} type={type} product={product} key={index}/>
            );
          })}
        </div>
        {nextBtn ? (
          <button
            onClick={() => handleNextClick()}
            className={`${styles.next} ${styles.btn}`}
          >
            <AiOutlineRight />
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default ProductSlider;
