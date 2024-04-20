import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Animate from "../animation/Animate";
import { AppContext } from "../context/Context";
import productData from "../json/searchResults.json";
import styles from "../styles/ProductBox.module.css";
import formatNumber from "../utils/formatNumbers";
import formatURL from "../utils/formatURL";
import Button from "./Button";

const ProductBox = ({ changePermit, min, product, productIndex }) => {
  const [selectedColorIndices, setSelectedColorIndices] = useState(
    Array(productData.length).fill(0)
  );
  const { removeFromCart, cartItems, addToCart } = useContext(AppContext);
  const inCart = cartItems.map((data) => data.id).includes(product.id);

  const handleColorClick = (productIndex, colorIndex) => {
    setSelectedColorIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[productIndex] = colorIndex;
      return newIndices;
    });

    const selectedColor = productData[productIndex].availableColors[colorIndex];
    const newProductData = [...productData];
    newProductData[productIndex].image = selectedColor.image;
  };

  return (
    <Animate type={"bottomToTop"}>
      <Link
        title={`View ${product.name}`}
        style={{ width: "100%" }}
        to={formatURL(`/products/${product.type}/${product.name}`)}
        key={productIndex}
        className={styles.product_box_item}
      >
        <div className={styles.product_img}>
          <img
            src={product.main_image}
            alt={product.name}
            style={{
              objectFit: product?.background ? "cover" : "contain",
              padding: product?.background ? "0px" : "10px",
            }}
          />
          <p className={styles.tag}>{product.tag}</p>
          <div className={styles.product_review}>
            <p style={{ display: "flex", alignItems: "center" }}>
              <FaStar
                style={{
                  marginRight: "2px",
                  marginBottom: "3px",
                  fontSize: "12px",
                  color: "yellow",
                }}
              />
              {product.reviewStars.toString().includes(".")
                ? product.reviewStars
                : `${product.reviewStars}.0`}
            </p>
            <span>|</span>
            <p style={{ display: "flex", alignItems: "center" }}>
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
        <div
          className={styles.product_box_content}
          style={{ padding: changePermit ? "10px 10px 0px 10px" : "0px 10px" }}
        >
          <div className={styles.product_box_info}>
            <h3>{product.name}</h3>
            <div className={styles.product_price}>
              <p className={styles.discount}>
                ₹{product.price.toLocaleString()}
              </p>
              <p className={styles.discounto}>
                ₹{product.original_price.toLocaleString()}
              </p>
              <p className={styles.discountp}>
                {" "}
                {product?.discount ? product.discount : "60"}% off
              </p>
            </div>
          </div>

          {changePermit ? null : (
            <div
              className={styles.product_box_colors}
              style={{
                height: changePermit ? "auto" : "65px",
                overflowY: "scroll",
              }}
            >
              <div className={styles.product_specialities}>
                {product.features &&
                  product.features.map((feature, index) => (
                    <span key={index}>{feature}</span>
                  ))}
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); inCart ? removeFromCart(product?.id) : addToCart(product) }}
          text={inCart ? "Remove from Cart" : "Add to Cart"}
          width="100%"
          padding="11px 20px"
          fontSize="0.8rem"
          margin="6px 0px"
          borderRadius="5px"
          label={inCart ? "Remove from Cart" : "Add to Cart"}
          background={
            inCart
              ? "var(--mid-dark-background)"
              : "var(--secondary-background)"
          }
        />
      </Link>
    </Animate>
  );
};

export default ProductBox;
