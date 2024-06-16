import React, { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Animate from "../animation/Animate";
import Button from "../components/Button";
import bestSellerCategoriesVideos from "../json/bestSellerCategories.json";
import dailyDeals from "../json/dailyDeals.json";
import heroSectionImages from "../json/heroSectionImages.json";
import newLaunches from "../json/newLaunches.json";
import reviews from "../json/reviews.json";
import CategorySlider from "../layouts/CategorySlider";
import ImageSlider from "../layouts/ImageSlider";
import styles from "../styles/Home.module.css";
import Slider from '../layouts/Slider'

const Home = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const heroSectionImageSlider = () => {
    const interval = setInterval(() => {
      setImageIndex((index) => {
        if (index === heroSectionImages.length - 1) return 0;
        return index + 1;
      });
    }, 3100);
  };

  useEffect(() => {
    heroSectionImageSlider();
  }, []);

  const categories = [
    "HEADPHONES",
    "SPEAKERS",
    "EARBUDS",
    "EARPHONES",
    "TRIMMERS",
    "SOUNDBOXES"
  ]

  return (
    <div id="home" className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" name="description" content="The most incredible range of wireless earphones, earbuds, headphones, smart watches, and home audio. From workouts to adventures, boAt will get you sailing!" />
        <title>Buy Earbuds, Headphones, Earphones at India's No.1 Earwear Brand: boAt</title>
        <link rel="canonical" href="http://localhost:4173/" />
      </Helmet>
      <section className={styles.hero_section}>
        <div className={styles.product_details}>
          <h1>
            <span className={styles.company_name}><Animate overflowHidden={true} type={"leftToRight"}>BO<span>A</span>T </Animate></span>
            <Animate overflowHidden={true} type={"leftToRight"} delay={0.2}>
              <span className={styles.cate}>
                {categories[imageIndex]}</span>
            </Animate>
          </h1>
          <Animate overflowHidden={true} type={"leftToRight"} delay={0.4}>
            <p>Dive into superior sound with our cutting-edge products. Elevate your audio experience with premium quality and unmatched performance on every wave.</p>
          </Animate>
          <Animate overflowHidden={true} type={"leftToRight"} width="100%" delay={0.6}>
            <div className={styles.btn_container} style={{ justifyContent: "flex-start", display: "flex", width: "100%" }}>
              <Link to={"/search?query=all"}>
                <Button text={"View Products"}
                  background="var(--secondary-background)" color="var(--primary-background)" />
              </Link>
              <Link to={"/about"}>
                <Button text={"About boAt"}
                  background="var(--mid-dark-background)" color="var(--primary-background)" marginLeft="15px" /></Link>
            </div>
          </Animate>

        </div>

        <div className={styles.product_image}>

          {heroSectionImages.map((image, index) => {
            return (
              <img
                style={{ translate: `${imageIndex * -100}%` }}
                key={index}
                src={image}
                alt={`slider-${index}`}
                loading="lazy"
              />
            );
          })}

        </div>

      </section >


      <div className="add-padding-container" id="home-products">

        <Slider
          data={dailyDeals}
          type={"product-slider"}
          tittle={"Daily"}
          highlight={"Deals"}
          counter={true}
          filterReq={false}
        />


        <section>
          <h2>
            Shop by <span className={styles.under_line}>Categories</span>
          </h2>
          <CategorySlider />
        </section>



        <Slider
          data={bestSellerCategoriesVideos}
          type={"vid-slider"}
          tittle={"Explore"}
          highlight={"Best Sellers"}
          counter={false}
          filterReq={false}
        />


        <Slider
          data={newLaunches}
          type={"product-slider"}
          tittle={"New"}
          highlight={"Launches"}
          counter={false}
          filterReq={false}
        />


        <Slider
          data={dailyDeals}
          type={"product-slider"}
          tittle={"Top Products from"}
          highlight={"boAt"}
          counter={false}
          filterReq={false}
        />


        <Slider
          data={reviews}
          type={"review-slider"}
          tittle={"Customers"}
          highlight={"Reviews"}
          counter={false}
          filterReq={false}
        />


        <ImageSlider tittle={"In the"} highlight={"Press"} />
      </div>
    </div >
  );
};

export default Home;
