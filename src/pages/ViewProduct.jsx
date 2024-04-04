
import mergedArray from "../utils/mergeJsonArray";
import React, { useState, useEffect } from "react";
import styles from "../styles/ViewProduct.module.css";
import { useParams } from "react-router-dom";
import {  FaLock } from "react-icons/fa6";


// Import your JavaScript data here

const ViewProduct = () => {
  const { name, type } = useParams();
  // const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("")

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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const modifiedName = name.toLowerCase().replace(/-/g, " ");
    const foundProduct = mergedArray.find((product) => {
      const modifiedProductName = product.name.toLowerCase();
      return (
        product.type.toLowerCase() === type &&
        modifiedProductName === modifiedName
      );
    });
    setProduct(foundProduct);
    setImage(foundProduct.main_image)
  }, []);

  // const handleImageClick = (index) => {
  //   setSelectedImageIndex(index);
  // };

  const handleImageSelect = (url) => {
    console.log(url)
    setImage(url)
  }


  return (
    <div className={styles.container}>

      {
        product && (
          <>
            <section className={styles.product_image_container}>

              <div className={styles.main_image}>
                <img src={image} alt="" />
              </div>

              <div className={styles.more_images}>
                <img src={product.main_image} alt="" onClick={() => handleImageSelect(product.main_image)} />
                {
                  product.more_images.map((image, index) => {
                    return (
                      <img className={styles.side_image} key={index} src={image} alt={`image[${index}]`}
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
                  <div><span className={styles.price}>1,499.00</span>
                    <span className={styles.original_price}>₹2,990.00</span>
                    <span className={styles.discount}>50% Off</span></div>
                  <p>Include all taxes</p>
                </div>

                <p className={styles.free_dil}>Free delivery <span>Saturday, April 13</span></p>
                <p className={styles.stock}>In Stock</p>

                <div className={styles.btn_container}>
                  <button className={styles.add_to_cart}>Add to Cart</button>
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


    // <div className={styles.container}>
    //   {product && (
    //     <>
    //       <div className={styles.maincoto}>
    //         <section className={styles.product_image_container}>
    //           <div className={styles.image_slider}>
    //             {product.more_images.map((imageUrl, index) => (
    //               <img
    //                 key={index}
    //                 src={imageUrl}
    //                 alt={product.name}
    //                 className={`${styles.image} ${selectedImageIndex === index && styles.selected
    //                   }`}
    //                 onClick={() => handleImageClick(index)}
    //               />
    //             ))}
    //           </div>
    //           <div className={styles.selected_image_container}>
    //             <img
    //               src={product.more_images[selectedImageIndex]}
    //               alt={product.name}
    //               className={styles.selected_image}
    //             />
    //           </div>
    //         </section>

    //         <section className={styles.product_details_container}>

    //           <div className={styles.product_info}>
    //             <span className={styles.review_cont}>
    //               <p> ⭐{product.reviewStars}</p>
    //               <p>{product.reviews} Reviews ✅</p>
    //             </span>
    //             <h2>{product.name}</h2>
    //             <p className={styles.description}> {product.description}</p>
    //             <div className={styles.pricecontaine}>
    //               <p className={styles.price}> ₹{product.price}</p>
    //               <p className={styles.original_price}> ₹{product.original_price}</p>
    //               <p className={styles.discount}>{product.discount}%</p>
    //               <div className={styles.time}>
    //                 <span>
    //                   <p>Ending in</p>
    //                   {timeLeft.hours.toString().padStart(2, "0")} <p>Hours</p>:
    //                 </span>
    //                 <span>
    //                   {timeLeft.minutes.toString().padStart(2, "0")}
    //                   <p>Minutes</p>:
    //                 </span>
    //                 <span>
    //                   {timeLeft.seconds.toString().padStart(2, "0")}
    //                   <p>Seconds</p>
    //                 </span>
    //               </div>
    //             </div>
    //           </div>

    //           <div className={styles.deliverybox}>
    //             <h3>Check Delievry</h3>
    //             <div className={styles.pincodebox}>
    //               <input type="text" />
    //               <button>Check</button>
    //             </div>
    //             <span className={styles.fred}>
    //               <p className={styles.green}>Free Delivery </p><p>|</p>
    //               <p> by Tommorrow  </p>
    //             </span>
    //             <p>If ordered in <a>18hrs 14min</a> </p>
    //           </div>

    //           <div className={styles.userlovesa}>
    //             <h4>Users Love</h4>
    //             <div className={styles.userloves}>

    //               <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Flipkart.png?v=1691406536" />
    //               <span>
    //                 <p>75 Lacs + Product sold on Flipkart</p>
    //                 <p>8 Lac + Reveiws</p>
    //               </span>
    //             </div>
    //           </div>

    //           <div className={styles.activeoffers}>
    //             <p>
    //               <i>More than 2 items</i>
    //               <i>1400/month</i>
    //               <span>Best value</span>
    //             </p>
    //             <p>
    //               <i>More than 5 items</i>
    //               <i>550/mont</i>
    //               <span>Most Popular</span>
    //             </p>
    //             <p>
    //               <i>Many items</i>
    //               <i>234/month</i>
    //               <span>Bulk Orders</span>
    //             </p>

    //           </div>

    //           <span className={styles.addtocart}>
    //             <a>Presnalise your product</a>
    //             <button>Add to cart</button>
    //           </span>
    //         </section>
    //       </div>

    //     </>
    //   )}

    //   <div className={styles.bcon}>
    //     <div className={styles.b1}>
    //       <img src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334305_small.svg?v=1682336123" alt=""  />
    //       <p><a>1 year </a>Warranty</p>
    //     </div>
    //     <div className={styles.b1}>
    //       <img src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334304_small.svg?v=1682336123" alt=""  />
    //       <p><a>7 Day </a>Replacement</p>
    //     </div>
    //     <div className={styles.b1}>
    //       <img src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334303_small.svg?v=1682336123" alt=""  />
    //       <p><a>Free </a>Shipping</p>
    //     </div>
    //     <div className={styles.b1}>
    //       <img src="https://www.boat-lifestyle.com/cdn/shop/files/Group_334302_small.svg?v=1682336123" alt=""  />
    //       <p><a>GST</a> billing</p>
    //     </div>
    //   </div>


    //   <div className={styles.Reviewcontainer}>
    //     <section className={styles.verifiedreviews}>
    //       <h2>Verified Reviews</h2>
    //       <div className={styles.starbox}>
    //         <div className={styles.overall}>
    //           <i>⭐⭐⭐⭐⭐</i>
    //           <a>Based On overall reveiws</a>

    //         </div>
    //         <div className={styles.prog}>
    //           <span className={styles.progcon}><a className={styles.stars}>⭐⭐⭐⭐⭐</a> <div className={styles.progressbox}><span className={styles.progressbar} ></span></div><i className={styles.percentage}>  84%</i> <i className={styles.percentage}>(1333)</i></span>
    //           <span className={styles.progcon}><a className={styles.stars}>⭐⭐⭐⭐</a><div className={styles.progressbox}><span className={styles.progressbar2}></span></div><i className={styles.percentage}>16%</i> <i className={styles.percentage}>(203)</i></span>
    //           <span className={styles.progcon}><a className={styles.stars}>⭐⭐⭐</a><div className={styles.progressbox}><span className={styles.progressbar3}></span></div><i className={styles.percentage}>0%</i> <i className={styles.percentage}>(0)</i></span>
    //           <span className={styles.progcon}><a className={styles.stars}>⭐⭐</a><div className={styles.progressbox}><span className={styles.progressbar4}></span></div><i className={styles.percentage}>0%</i> <i className={styles.percentage}>(0)</i></span>
    //           <span className={styles.progcon}><a className={styles.stars}>⭐</a><div className={styles.progressbox}><span className={styles.progressbar5}></span></div><i className={styles.percentage}>0%</i> <i className={styles.percentage}>(0)</i></span>
    //         </div>
    //         <div className={styles.reviewbut}>
    //           <button>Write an reveiw</button>
    //         </div>
    //       </div>
    //     </section>





    //   </div>
    //   <h2 className={styles.userReviewhead}>User Reviews</h2>
    //   <div className={styles.userReviewsSection}>
    //     {userReviewsData.map((review, index) => (
    //       <div key={index} className={styles.userReview}>
    //         <div className={styles.reviewHeader}>
    //           <div>
    //             <h3>{review.username}</h3>
    //             <p>{review.reviewed_on}</p>
    //           </div>
    //         </div>
    //         <div className={styles.reviewRating}>
    //           <span className={styles.review_stars}>{review.review_stars} </span>
    //           {review.verified && <span className={styles.verifieds}>Verified Purchase</span>}
    //         </div>
    //         <div className={styles.reviewImages}>
    //           {review.review_images.map((image, imgIndex) => (
    //             <img
    //               key={imgIndex}
    //               src={image}
    //               alt={`Review Image ${imgIndex}`}
    //             />
    //           ))}
    //         </div>
    //         <div className={styles.reviewContent}>
    //           <h4>{review.review_title}</h4>
    //           <p>{review.review_description}</p>

    //         </div>
    //       </div>
    //     ))}
    //   </div>

    // </div>
  )

};

export default ViewProduct;
