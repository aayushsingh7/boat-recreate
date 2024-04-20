import React, { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
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

  return (
    <div id="home" className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" name="description" content="The most incredible range of wireless earphones, earbuds, headphones, smart watches, and home audio. From workouts to adventures, boAt will get you sailing!" />
        <title>Buy Earbuds, Headphones, Earphones at India's No.1 Earwear Brand: boAt</title>
        <link rel="canonical" href="http://localhost:4173/" />
      </Helmet>
      <section className={styles.hero_section}>
        <section className={styles.text_container}>
          <Animate overflowHidden={true} type={"topToBottom"}>
            <h2 className={styles.hero_heading}>
              <span>
                bo<span>A</span>t
              </span>
              <TypeAnimation
                sequence={[
                  "Headphones.",
                  2500,
                  "Speakers.",
                  2500,
                  "Earbuds.",
                  2500,
                  "Earphones.",
                  2500,
                  "Trimmers.",
                  2500,
                  "SoundBox.",
                  2500,
                ]}
                speed={70}
                repeat={Infinity}
              />
            </h2>
          </Animate>
          <Animate overflowHidden={true} type={"topToBottom"} delay={0.25}>
            <div className={styles.btn_container}>
              <a href="#home-products" style={{ textDecoration: "none" }}>
                <Button
                  label={"Shop now"}
                  padding="12px 30px"
                  borderRadius="5px"
                  fontSize="1rem"
                  margin="10px"
                  background="var(--secondary-background)"
                  text={"Shop now"}
                />
              </a>
              <Link style={{ textDecoration: "none" }} title="Go to about page" to={"/about"}>
                <Button
                  label={"About us"}
                  padding="12px 30px"
                  borderRadius="5px"
                  fontSize="1rem"
                  margin="10px"
                  background="var(--mid-dark-background)"
                  text={"About Us"}
                />
              </Link>
            </div>
          </Animate>
        </section>
        <section className={styles.img_container}>
          <div className={styles.slider}>
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
        </section>
        <span className={styles.cutter}></span>
      </section>

      <div className="add-padding-container" id="home-products">


        <section>
          <h2>
            Shop by <span className={styles.under_line}>Categories</span>
          </h2>
          <CategorySlider />
        </section>


        <Slider
          data={dailyDeals}
          type={"product-slider"}
          tittle={"Daily"}
          highlight={"Deals"}
          counter={true}
          filterReq={false}
        />


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
    </div>
  );
};

export default Home;
