import React, { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoCart, IoCartOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { AppContext } from '../context/Context';

import styles from '../styles/SliderBox.module.css';
import formatNumber from "../utils/formatNumbers";
import formatURL from "../utils/formatURL";
import Button from './Button';
import ReviewBox from './ReviewBox';


const SliderBox = ({ setSelectedVid, selectedVid, data, type, index }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(AppContext);
  return (
    <>
      {type === "product-slider" ? (
        <Link className={styles.product_container} to={formatURL(`/products/${data.type}/${data.name}`)} >

          <div className={styles.product_img}>
            <img src={data.more_images[0]} alt="" />


          </div>

          <div className={styles.details}>
            <p>{data.name}</p>
            <div className={styles.seprator}>
              <div>
                <div className={styles.pricing}>
                  <span className={styles.price}>
                    ₹{data.price.toLocaleString()}.00
                  </span>
                  <span className={styles.before_discount}>
                    {data.original_price.toLocaleString()}
                    .00
                  </span>
                  <span className={styles.discountp}>
                    {data.discount}% off
                  </span>
                </div>
                <div className={styles.product_review}>
                <p style={{display:"flex",alignItems:"center"}} >
                  <FaStar style={{marginRight:"2px",marginBottom:"3px",fontSize:"12px",color:"yellow"}}/>{data.reviewStars.toString().includes(".") ? data.reviewStars : `${data.reviewStars}.0`}</p>
                  <span>|</span>
                  <p
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {formatNumber(data.reviews)}{" "}
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

              {cartItems.map((item) => item.id).includes(data.id) ? (
                <Button className={styles.product_slider_box_btn} text={<IoCart fontSize="30px" />} onClick={(e) => { e.preventDefault(); removeFromCart(data.id) }} padding="8px 10px" width="auto" fontSize="0.7rem" borderRadius="5px" background="var(--secondary-background)" />

              ) : (
                <Button className={styles.product_slider_box_btn} text={<IoCartOutline fontSize="30px" />} onClick={(e) => { e.preventDefault(); addToCart(data) }} padding="8px 10px" width="auto" fontSize="0.8rem" borderRadius="5px" background="var(--mid-dark-background)" />
              )}

            </div>
          </div>
        </Link>
      ) : type === "review-slider" ? (
        <ReviewBox  review={data} type="fixed"/>
      ) :  (
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
            url={data.url}
          />
        </div> 
         
          <p>{data.type}</p>
        </div>
      )
      }
    </>
  )
}

export default SliderBox