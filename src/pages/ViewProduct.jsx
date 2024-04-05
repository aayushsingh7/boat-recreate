
import mergedArray from "../utils/mergeJsonArray";
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/ViewProduct.module.css";
import { useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa6";
import ProductSlider from '../layouts/ProductSlider'
import products from '../json/dailyDeals.json'
import { AppContext } from "../context/Context";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillDislike, AiFillLike, AiFillStar, AiOutlineDislike } from "react-icons/ai";
import reviews from '../json/reviews.json'
import { AiOutlineLike } from "react-icons/ai";
import ReviewBox from "../components/ReviewBox";




// Import your JavaScript data here

const ViewProduct = () => {
  const { name, type } = useParams();
  const { addToCart, removeFromCart, cartItems, user } = useContext(AppContext)
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("")

  // const [inCart,setInCart] = useState(false)
  // setInCart(cartItems.map((d)=> d.id).includes(foundProduct.id))

  // searching the requested product

  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const difference = midnight - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const modifiedName = name.toLowerCase().replace(/-/g, " ");
    const foundProduct = mergedArray.find((product) => {
      const modifiedProductName = product.name.toLowerCase();
      console.log(product.type.toLowerCase().replace(/\s/g, ""), type.replace(/-/g, ""))
      return (
        product.type.toLowerCase().replace(/\s/g, "") === type.replace(/-/g, "") &&
        modifiedProductName === modifiedName
      );
    });

    const updatedImagesArray = [...foundProduct.more_images.slice(1)]

    setProduct({
      ...foundProduct,
      more_images: updatedImagesArray
    });
    setImage(foundProduct.main_image)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [name, type]);


  const handleImageSelect = (url) => {
    setImage(url)
  }

  console.log(window.innerWidth)


  return (
    <div className={styles.container}>

      <div className={styles.product_main_container}>
        {
          product && (
            <>
              <section className={styles.product_image_container}>

                <div className={styles.main_image}>
                  <img src={image} alt="" />
                  {
                    window.innerWidth < 530 && product.more_images.map((image, index) => {
                      return (
                        <img onMouseEnter={() => setImage(image)} className={styles.side_image} key={index} src={image} alt={`image[${index}]`}
                          onClick={() => handleImageSelect(image)} />
                      )
                    })
                  }
                </div>

                <div className={styles.more_images}>
                  <img onMouseEnter={() => setImage(product.main_image)} src={product.main_image} alt="" onClick={() => handleImageSelect(product.main_image)} />
                  {
                    window.innerWidth > 530 && product.more_images.map((image, index) => {
                      return (
                        <img onMouseEnter={() => setImage(image)} className={styles.side_image} key={index} src={image} alt={`image[${index}]`}
                          onClick={() => handleImageSelect(image)} />
                      )
                    })
                  }


                </div>
              </section>


              <section className={styles.product_details_container}>
                <h3>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.tags_container}>
                  <p>Speical Features: </p>
                  {
                    product.features.map((feature, index) => {
                      return (
                        <span key={index}>{feature}</span>
                      )
                    })
                  }
                </div>


                <div className={styles.payment_container}>

                  <div className={styles.pricing}>
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <span className={styles.price}><span>₹</span>{product.price.toLocaleString()}<span>00</span></span>
                      <span className={styles.original_price}>₹{product.original_price.toLocaleString()}.00</span>
                      <span className={styles.discount}>{product.discount}% Off</span></div>
                    <p>Include all taxes</p>
                  </div>

                  <p className={styles.free_dil}>Free delivery <span>Saturday, April 13</span></p>
                  <p className={styles.stock}>In Stock</p>

                  <div className={styles.btn_container}>
                    {
                      cartItems.map((item) => item.id).includes(product.id) ?
                        <button className={styles.cart_btn} onClick={() => removeFromCart(product.id)}>Remove from Cart</button> :
                        <button className={styles.cart_btn} onClick={() => addToCart(product)}>Add to Cart</button>
                    }
                    <button className={styles.buy_now}>Buy Now</button>
                  </div>

                  <span className={styles.sec_trans}><FaLock /> Secure transaction</span>
                </div>

                <div className={styles.product_offers}>
                  <h5>Available offers: </h5>
                  <div className={styles.offers_slider}>
                    <div className={styles.offer}>
                      <h5>Bank Offer</h5>
                      <p>Upto ₹850.00 discount on select Credit Cards, Debit Carts and more</p>
                      <button>Use now</button>
                    </div>

                    <div className={styles.offer}>
                      <h5>Cashbacks</h5>
                      <p>Amazon Pay Rewards - Shop and Get rewards worth 850rs</p>
                      <button>Use now</button>
                    </div>


                    <div className={styles.offer}>
                      <h5>Partner offers</h5>
                      <p>Get GST invoice and save up to 28% on business purchases</p>
                      <button>Use now</button>
                    </div>
                  </div>
                </div>

                <div className={styles.about_product}>
                  <h5>About this product</h5>
                  <ul>
                    <li>Its 40mm dynamic drivers help pump out immersive HD audio all day long</li>
                    <li>It provides a massive battery backup of upto 15 hours for a superior playback time.</li>
                    <li>It has been ergonomically designed and structured as an on-ear headphone to provide the best user experience with its comfortable padded earcushions and lightweight design</li>
                    <li>You can control your music without hiccups using the easy access controls, communicate seamlessly using the built-in mic, access voice assistant and always stay in the zone</li>
                    <li>Tap into instant wireless connectivity with optimum Bluetooth V4.2 connectivity</li>
                    <li>One can connect to boAt Rockerz 450 via not one but two modes, Bluetooth as well as AUX</li>
                  </ul>
                </div>



              </section>
            </>
          )
        }

      </div>

      <div className={styles.slider_padding}>
        <ProductSlider
          data={products}
          type={"product-slider"}
          tittle={"More From"}
          highlight={"boAt"}
          counter={false}
        />
      </div>

      <div className={styles.reviews_container}>
        <h2 >Customers <span>Reviews</span>:</h2>

        <div className={styles.reviews_details}>

          <section className={styles.reviews_summary}>

            <div className={styles.star_counter}><span>5 star</span> <p><span style={{ width: "60%" }}></span></p> <span>20%</span></div>

            <div className={styles.star_counter}><span>4 star</span> <p><span style={{ width: "20%" }}></span></p> <span>20%</span></div>
            <div className={styles.star_counter}><span>3 star</span> <p><span style={{ width: "10%" }}></span></p> <span>20%</span></div>
            <div className={styles.star_counter}><span>2 star</span> <p><span style={{ width: "8%" }}></span></p> <span>20%</span></div>
            <div className={styles.star_counter}><span>1 star</span> <p><span style={{ width: "2%" }}></span></p> <span>20%</span></div>

            <div className={styles.btn_container}>
              <button>Add a Customer Review</button>
            </div>

          </section>



          <section className={styles.reviews_flex_container}>


            {
              reviews.map((review, index) => {
                return (
                  <ReviewBox key={index} review={review} />
                )
              })
            }


          </section>

        </div>

      </div>

    </div>
  )

};

export default ViewProduct;
