
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";


import { Helmet } from "react-helmet";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { GoDot, GoDotFill } from "react-icons/go";
import Button from "../components/Button";
import ReviewBox from "../components/ReviewBox";
import products from '../json/dailyDeals.json';
import reviews from '../json/reviews.json';
import Slider from '../layouts/Slider';
import styles from "../styles/ViewProduct.module.css";
import formatURL from "../utils/formatURL";
import mergedArray from "../utils/mergeJsonArray";




const ViewProduct = () => {

  const { name, type } = useParams();
  const { addToCart, removeFromCart, cartItems } = useContext(AppContext)
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("")
  const [imageIndex, setImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef(null)
  let selected;
  let scrollLeft;
  let startX;


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })

  }, []);


  useEffect(() => {

    setLoading(true)
    const modifiedName = name.toLowerCase().replace(/-/g, " ");
    const foundProduct = mergedArray.find((product) => {
      const modifiedProductName = product.name.toLowerCase();
      return (
        product.type.toLowerCase().replace(/\s/g, "") === type.replace(/-/g, "") &&
        modifiedProductName === modifiedName
      );
    });

    let updatedImagesArray = [...foundProduct.more_images.slice(1)]
    updatedImagesArray.unshift(foundProduct.main_image)




    setProduct({
      ...foundProduct,
      more_images: updatedImagesArray
    });
    setImage(foundProduct.main_image)

    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => {
      setLoading(false)
    }, 300)

  }, [name, type]);


  const handleImageSelect = (url) => {
    setImage(url)
  }

  const handlePrevClick = () => {
    setImageIndex((index) => {
      if (index === 0) return product.more_images.length - 1
      return index - 1;
    })
  }

  const handleNextClick = () => {
    setImageIndex((index) => {
      if (index === product.more_images.length - 1) return 0;
      return index + 1
    })
  }

  const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews?.forEach(review => {
    ratingCount[Math.floor(review.review_stars)]++;
  });

  const totalReviews = reviews.length;
  const fiveStarPercent = totalReviews > 0 ? (ratingCount[5] / totalReviews * 100).toFixed(0) : 0;
  const fourStarPercent = totalReviews > 0 ? (ratingCount[4] / totalReviews * 100).toFixed(0) : 0;
  const threeStarPercent = totalReviews > 0 ? (ratingCount[3] / totalReviews * 100).toFixed(0) : 0;
  const twoStarPercent = totalReviews > 0 ? (ratingCount[2] / totalReviews * 100).toFixed(0) : 0;
  const oneStarPercent = totalReviews > 0 ? (ratingCount[1] / totalReviews * 100).toFixed(0) : 0;


  const handleMouseDown = (e) => {
    e.preventDefault();
    selected = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseUp = (e) => {
    selected = false;
  };


  const handleMouseMove = (e) => {
    if (!selected) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" name="description" content="The most incredible range of wireless earphones, earbuds, headphones, smart watches, and home audio. From workouts to adventures, boAt will get you sailing!" />
        <title>{`View ${name}`}</title>
        <link rel="canonical" href={formatURL(`http://localhost:4173/products/${type}/${name}`)} />
      </Helmet>
      <div className={styles.product_main_container} style={{ minHeight: "100vh" }}>
        {
          product && (
            <>
              <section className={styles.product_image_container}>

                <div className={styles.main_image}>
                  <Button onClick={handlePrevClick} text={<AiOutlineLeft style={{ fontSize: "18px", color: "var(--primary-background)" }} />} background="var(--primary-color)" height="32px" width="32px" borderRadius="50%" position="absolute" top="50%" transform="translateY(-50%)" left="3%" zIndex="10" boxShadow="0px 0px 4px 1px #313131" label={"Previous Image"} />

                  {
                    product.more_images.map((image, index) => {

                      return (
                        <img
                          key={index} src={loading ? "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_600,q_85,w_600/v1713255627/boat-recreate/images/template_fycuxp.webp" : image} alt={`image[${index}]`}
                          onError={(e) => {
                            e.target.src = "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_600,q_85,w_600/v1713255627/boat-recreate/images/template_fycuxp.webp";
                            e.target.alt = "Something went wrong!";
                          }}
                          onClick={() => handleImageSelect(image)} style={{ translate: `${-100 * imageIndex}%` }}
                        />
                      )


                    })
                  }
                  <Button onClick={handleNextClick} text={<AiOutlineRight style={{ fontSize: "18px", color: "var(--primary-background)" }} />} background="var(--primary-color)" height="32px" width="32px" borderRadius="50%" position="absolute" top="50%" transform="translateY(-50%)" right="3%" zIndex="10" boxShadow="0px 0px 4px 1px #313131" label={"Next Image"} />

                  <div className={styles.image_counter_dots}>
                    {
                      product.more_images.map((image, index) => {
                        return <Button label={"Image index"} onClick={() => setImageIndex(index)} key={image} text={index === imageIndex ? <GoDotFill style={{ fontSize: "17px" }} /> : <GoDot style={{ fontSize: "17px" }} />} background="none" />
                      })
                    }
                  </div>

                </div>

                <div className={styles.more_images}>

                  {
                    window.innerWidth > 530 && product.more_images.map((image, index) => {
                      return (
                        <img onMouseEnter={() => setImageIndex(index)} className={styles.side_image} key={index} src={loading ? "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_600,q_85,w_600/v1713255627/boat-recreate/images/template_fycuxp.webp" : image} alt={`image[${index}]`} onError={(e) => {
                          e.target.src = "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_600,q_85,w_600/v1713255627/boat-recreate/images/template_fycuxp.webp";
                          e.target.alt = "Something went wrong!";
                        }}
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

                        <Button label={"Remove from cart"} text={"Remove from Cart"} onClick={() => removeFromCart(product.id)} padding={"14px 15px"} width={"100%"} fontSize={"0.8rem"} borderRadius={"10px"} background={"var(--mid-dark-background)"} /> :
                        <Button label={"Add to cart"} text={"Add to Cart"} onClick={() => addToCart(product)} padding={"14px 15px"} width={"100%"} fontSize={"0.8rem"} borderRadius={"10px"} background={"var(--mid-dark-background)"} />
                    }
                    <Button label={"Buy now"} text={"Buy Now"} padding={"14px 15px"} marginTop="7px" width={"100%"} fontSize={"0.8rem"} borderRadius={"10px"} background={"var(--secondary-background)"} />
                  </div>

                  <span className={styles.sec_trans}><FaLock /> Secure transaction</span>
                </div>

                <div className={styles.product_offers} style={{ position: "relative" }}>
                  <h5>Available offers: </h5>
                  <div className={styles.offers_slider} ref={sliderRef} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
                    <div className={styles.offer}>
                      <h5>Bank Offer</h5>
                      <p>Upto ₹850.00 discount on select Credit Cards, Debit Carts and more</p>
                      <Button label={"Bank Offer"} background="none" text={"Use now"} width="100%" textAlign="start" />
                    </div>

                    <div className={styles.offer}>
                      <h5>Cashbacks</h5>
                      <p>Amazon Pay Rewards - Shop and Get rewards worth 850rs</p>
                      <Button label={"Cashbacks"} background="none" text={"Use now"} width="100%" textAlign="start" />
                    </div>


                    <div className={styles.offer}>
                      <h5>Partner offers</h5>
                      <p>Get GST invoice and save up to 28% on business purchases</p>
                      <Button label={"Partner offers"} background="none" text={"Use now"} width="100%" textAlign="start" />
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
        <Slider
          data={products}
          type={"product-slider"}
          tittle={"More From"}
          highlight={"boAt"}
          counter={false}
          id={product?.id}
        />
      </div>

      <div className={styles.reviews_container}>
        <h2 >Customers <span>Reviews</span>:</h2>-

        <div className={styles.reviews_details}>


          <section className={styles.reviews_summary}>

            <div className={styles.star_counter}><span>5 star</span> <p><span style={{ width: `${fiveStarPercent}%` }}></span></p> <span>{fiveStarPercent}%</span></div>
            <div className={styles.star_counter}><span>4 star</span> <p><span style={{ width: `${fourStarPercent}%` }}></span></p> <span>{fourStarPercent}%</span></div>
            <div className={styles.star_counter}><span>3 star</span> <p><span style={{ width: `${threeStarPercent}%` }}></span></p> <span>{threeStarPercent}%</span></div>
            <div className={styles.star_counter}><span>2 star</span> <p><span style={{ width: `${twoStarPercent}%` }}></span></p> <span>{twoStarPercent}%</span></div>
            <div className={styles.star_counter}><span>1 star</span> <p><span style={{ width: `${oneStarPercent}%` }}></span></p> <span>{oneStarPercent}%</span></div>

            <div className={styles.btn_container}>

              <Button label={"Add a customer review"} text={"Add a Customer Review"} padding={"14px 15px"} width={"100%"} fontSize={"0.8rem"} borderRadius={"10px"} background={"var(--secondary-background)"} />
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
