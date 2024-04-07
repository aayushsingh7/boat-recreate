import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbShoppingCartCancel } from "react-icons/tb";
import Button from "../components/Button";
import ProductBox from "../components/ProductBox";
import { AppContext } from "../context/Context";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { showCart, setShowCart, cartItems } = useContext(AppContext);

  let totalPrice = cartItems.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

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

        {cartItems.length === 0 ? (
          <div className={styles.template}>
            <TbShoppingCartCancel />
            <p>Nothing in cart</p>
          </div>
        ) : (
          <>
            <ul className={styles.product_container}>
              {cartItems.length > 0
                ? cartItems.map((product, index) => {
                    return (
                      <ProductBox
                        changePermit={true}
                        min={430}
                        product={product}
                        productIndex={index}
                        key={index}
                      />
                    );
                })
                : null}
            </ul>
            <div className={styles.summary_container}>
              <p>
                Subtotal ({cartItems.length} items):{" "}
                <span
                  style={{
                    color: "var(--secondary-background)",
                    fontWeight: "600",
                  }}
                >
                  ₹{totalPrice.toLocaleString()}.00
                </span>
              </p>

              <label>
                <input type="checkbox" id="gift" />
                This order contains a gift
              </label>

            <Button text={"Proceed to Payment"} padding="15px" width="100%" fontSize="0.8rem" borderRadius="10px" background="var(--secondary-background)"/>
            
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
