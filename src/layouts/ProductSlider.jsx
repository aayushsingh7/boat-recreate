
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "../styles/ProductSlider.module.css";
import ReactPlayer from "react-player";

const ProductSlider = ({ data, type, highlight, tittle }) => {
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
    <section>
      {tittle && highlight ? (
        <h2>
          {tittle} <span className={styles.under_line}>{`${highlight}`}</span>
        </h2>
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
          {data.map((data, index) => {
            return (
              <>
                {type === "product-slider" ? (
                  <div className={styles.product_container}>
                    <div className={styles.product_img}>
                      <img src={data.url} alt="" />
                      {data.tag && (
                        <span className={styles.tag}>{data.tag}</span>
                      )}
                      {data.special && (
                        <span className={styles.special}>{data.special}</span>
                      )}
                    </div>

                    <div className={styles.details}>
                      <p>{data.name}</p>
                      <div className={styles.seprator}>
                        <div className={styles.pricing}>
                          <span className={styles.price}>
                            ₹9{data.price}.00
                          </span>
                          <span className={styles.before_discount}>
                            ₹799.00
                          </span>
                          <span className={styles.discountp}>
                            {data.discountp}% off
                          </span>
                        </div>
                        <button>Add to cart</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.vid_box}>
                    <div
                      key={index}
                      className={styles.vid_container}
                      onMouseEnter={() => setSelectedVid(index)}
                      onMouseLeave={() => setSelectedVid(100)}
                    >
                      <ReactPlayer
                        muted={true}
                        loop={true}
                        width={320}
                        height={320}
                        playing={index === selectedVid}
                        url={data.url}
                      />
                    </div>
                    <p>{data.type}</p>
                  </div>
                )}
              </>
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

