import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "../styles/ProductSlider.module.css";
import ReactPlayer from "react-player";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import DealCounter from "./DealCounter";
import { AppContext } from "../context/Context";
import formatNumber from "../utils/formatNumbers";
import { Link } from "react-router-dom";
import formatURL from "../utils/formatURL";

const ProductSlider = ({ data, type, highlight, tittle, counter }) => {

  const sliderRef = useRef(null);
  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [selectedVid, setSelectedVid] = useState(100);
  const { addToCart, removeFromCart, cartItems } = useContext(AppContext);

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
          {data.map((product, index) => {
            return (
              <>
                {type === "product-slider" ? (
                 <Link className={styles.product_container} to={formatURL(`/products/${product.type}/${product.name}`)} >
                 
                    <div className={styles.product_img}>
                      <img src={product.more_images[0]} alt="" />
                      {product.tag && (
                        <span className={styles.tag}>{product.tag}</span>
                      )}
                     
                    </div>

                    <div className={styles.details}>
                      <p>{product.name}</p>
                      <div className={styles.seprator}>
                        <div>
                          <div className={styles.pricing}>
                            <span className={styles.price}>
                              ₹{product.price.toLocaleString()}.00
                            </span>
                            <span className={styles.before_discount}>
                              {product.original_price.toLocaleString()}
                              .00
                            </span>
                            <span className={styles.discountp}>
                              {product.discount}% off
                            </span>
                          </div>
                          <div className={styles.product_review}>
                            <p>
                              ⭐
                              {product.reviewStars &&
                              product.reviewStars.toString().includes(".")
                                ? product.reviewStars
                                : `${product.reviewStars}.0`}
                            </p>
                            <span>|</span>
                            <p
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {formatNumber(product.reviews)}{" "}
                              <RiVerifiedBadgeFill
                                style={{
                                  fontSize: "13px",
                                  marginLeft: "2px",
                                  color: "#00da00",
                                }}
                              />
                            </p>
                          </div>
                        </div>
                        {cartItems.map((item) => item.id).includes(product.id) ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              removeFromCart(product.id);
                            }}
                          >
                            Remove from cart
                          </button>
                        ) : (
                          <button onClick={(e) => {
                            e.preventDefault()
                            addToCart(product)}}>
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                 </Link>
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
                        width={"50vw"}
                        height={"50vw"}
                        playing={index === selectedVid}
                        url={product.url}
                      />
                    </div>
                    <p>{product.type}</p>
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
