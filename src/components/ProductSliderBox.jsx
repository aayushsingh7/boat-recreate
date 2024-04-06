import React, { useContext } from 'react'
import { AppContext } from '../context/Context';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ReactPlayer from "react-player"
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import {FaStar} from 'react-icons/fa'

import formatNumber from "../utils/formatNumbers";
import formatURL from "../utils/formatURL";
import styles from '../styles/ProductSliderBox.module.css'
import Button from './Button';


const ProductSliderBox = ({ setSelectedVid, selectedVid, product, type, index }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(AppContext);
  return (
    <>
      {type === "product-slider" ? (
        <Link className={styles.product_container} to={formatURL(`/products/${product.type}/${product.name}`)} >

          <div className={styles.product_img}>
            <img src={product.more_images[0]} alt="" />


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
                <p style={{display:"flex",alignItems:"center"}} >
                  <FaStar style={{marginRight:"2px",marginBottom:"3px",fontSize:"12px",color:"yellow"}}/>{product.reviewStars.toString().includes(".") ? product.reviewStars : `${product.reviewStars}.0`}</p>
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
                <Button className={styles.product_slider_box_btn} text={<IoCart fontSize="30px" />} onClick={(e) => { e.preventDefault(); removeFromCart(product.id) }} padding="8px 10px" width="auto" fontSize="0.7rem" borderRadius="5px" background="var(--secondary-background)" />

              ) : (
                <Button className={styles.product_slider_box_btn} text={<IoCartOutline fontSize="30px" />} onClick={(e) => { e.preventDefault(); addToCart(product) }} padding="8px 10px" width="auto" fontSize="0.8rem" borderRadius="5px" background="var(--mid-dark-background)" />
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
  )
}

export default ProductSliderBox