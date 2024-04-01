import React, { useState } from 'react';
import styles from "../styles/ProductBox.module.css";
import productData from "../json/SearchResult.json";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ProductBox = ({changePermit,min,product,productIndex}) => {

  const [selectedColorIndices, setSelectedColorIndices] = useState(Array(productData.length).fill(0));

  const handleColorClick = (productIndex, colorIndex) => {
    setSelectedColorIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[productIndex] = colorIndex;
      return newIndices;
    });
  
    const selectedColor = productData[productIndex].availableColors[colorIndex];
    const newProductData = [...productData];
    newProductData[productIndex].image = selectedColor.image;
  
    // setProductData(newProductData); 
  };

  return (
   
          <div key={productIndex} className={styles.product_box_item} style={{height:min ? `${min}px` : 'auto'}}>
            <div className={styles.product_img}>
              <img src={product.image} alt={product.name} />
              {/* <p className={product.engraving ? styles.engrave : styles.engraven}> {product.engraving ? "✍️ Special Engraving Available" : ""}</p> */}
              <p className={styles.tag}>{product.tag}</p>
              <div className={styles.product_review}>
                <p>⭐{product.reviewStars}</p>
                <span>|</span>
                <p style={{display:"flex",alignItems:"center"}}>{product.reviews} <RiVerifiedBadgeFill style={{fontSize:"13px",marginLeft:"2px",color:"#00da00"}}/></p>
              </div>
            </div>
            <div className={styles.product_box_content}>
            
              <div className={styles.product_box_info}>
                <h1>{product.name}</h1>
                <div className={styles.product_price}>
                  <p className={styles.discount}>₹{(product.discountprice).toLocaleString()}</p>
                  <p className={styles.discounto}>₹{(product.originalPrice).toLocaleString()}</p>
                  <p className={styles.discountp}> {product.discount}% off</p>
                </div>
              </div>
             
              <div className={styles.product_box_colors}>
                <div className={styles.product_specialities}>
                  {product.specialities.map((speciality, index) => (
                    <span key={index}>{speciality} |</span>
                  ))}
                </div>
                {product.availableColors ? (
                  <div className={styles.product_colors}>
                    <ul>
                      {product.availableColors.map((color, colorIndex) => (
                        <button className={styles.color_button}
                          key={colorIndex}
                          onClick={() => handleColorClick(productIndex, colorIndex)}
                          style={{
                            backgroundColor: color.color,
                            border: selectedColorIndices[productIndex] === colorIndex ? '2px solid red' : 'none'
                          }}
                        >
                          <span style={{ backgroundColor: color.color }}></span>
                        </button>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className={styles.engraven}></p>
                  )}
              </div>
            </div>
            <button className={`${changePermit ? styles.remove_cart : styles.view_product} ${styles.btn_btn}`}>
              {changePermit ? "Remove from Cart"  : "View Product"}</button>
          </div>
       
     
  );
};

export default ProductBox;
