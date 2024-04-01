import React, { useContext, useEffect } from "react";
import styles from "../styles/Cart.module.css";
import { AppContext } from "../context/Context";
import { AiOutlineClose } from "react-icons/ai";
import searchResults from '../json/SearchResult.json'
import ProductBox from '../components/ProductBox'

const Cart = () => {
  const { showCart, setShowCart } = useContext(AppContext);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [showCart]);

  return (
    <>
      <div
        onClick={() => setShowCart(false)}
        className={`${styles.shadow} ${
          showCart ? styles.show_shadow : styles.hide_shadow
        }`}
      ></div>
      <div
        className={`${styles.container} ${
          showCart ? styles.show : styles.hide
        }`}
      >
        <div className={styles.header}>
          <h2>Cart</h2>
          <AiOutlineClose
            className={styles.close}
            onClick={() => setShowCart(false)}
          />
        </div>

        <ul className={styles.product_container}>
         {/* <p className={styles.heading}>Total Items: 1</p> */}
         {
          searchResults.map((product,index)=> {
            return (
              <ProductBox changePermit={true} min={430} product={product} productIndex={index} key={index}/>
            )
          })
         }
        </ul>

     <div className={styles.summary_container}>
      <p>Subtotal (2 items):  <span style={{color:"var(--secondary-background)",fontWeight:"600"}}>₹5,294.00</span></p>
     
      <label>
        <input type="checkbox" id="gift"/>
        This order contains a gift
        </label>
    
     <button className={styles.btn_one}>Proceed to Payment</button>
     {/* <button className={styles.btn_two}>Clear cart</button> */}
        </div>

      </div>
    </>
  );
};

export default Cart;
