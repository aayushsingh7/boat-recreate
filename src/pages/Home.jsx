import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import TextTransition, { presets } from "react-text-transition";
import heroSectionImages from "../json/heroSectionImages.json";
import ProductSlider from "../layouts/ProductSlider";
import CategorySlider from "../layouts/CategorySlider";
import newLaunches from "../json/newLaunches.json";
import bestSellerCategoriesVideos from "../json/bestSellerCategories.json";
import dailyDeals from "../json/dailyDeals.json";
import { Link } from "react-router-dom";

const TEXTS = [
  "Headphones",
  "Speakers",
  "Earbuds",
  "Earphones",
  "Trimmers",
  "SoundBox",
];

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div id="home" className={styles.container}>
      <section className={styles.hero_section}>
        <section className={styles.text_container}>
          <p>Listening music becomes fun with</p>
          <h2>
            <p>
              bo<span style={{ color: "red" }}>A</span>t
            </p>
            <p>
              {" "}
              <TextTransition
                translateValue="30%"
                springConfig={presets.default}
              >
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </p>
          </h2>
          {/* <p>BoAt Lifestyle is India’s fastest growing audio and wearables brand. They have a wide range of wireless earphones, earbuds, headphones, smart watches, and home audio. Whether you're working out or on an adventure, BoAt will get you sailing!</p> */}
          <div className={styles.btn_container}>
            <a href="#home-products" style={{ textDecoration: "none" }}>
              <button
                className={styles.one}
                style={{ background: "var(--secondary-background)" }}
              >
                Shop now
              </button>
            </a>
            <Link to={"/about"}>
              {" "}
              <button className={styles.one}>About us</button>
            </Link>
          </div>
        </section>
        <section className={styles.img_container}>
          <div className={styles.slider}>
            {heroSectionImages.map((image, index) => {
              return <img key={index} src={image} alt={`slider-${index}`} />;
            })}
          </div>
        </section>
      </section>

      <div className="add-padding-container" id="home-products">
        <ProductSlider
          data={bestSellerCategoriesVideos}
          type={"video-slider"}
          tittle={"Explore"}
          highlight={"Best Sellers"}
        />

        <section>
          <h2>
            Shop by <span className={styles.under_line}>Categories</span>
          </h2>
          <CategorySlider />
        </section>

        <ProductSlider
          data={newLaunches}
          type={"product-slider"}
          tittle={"New"}
          highlight={"Launches"}
        />

        <ProductSlider
          data={dailyDeals}
          type={"product-slider"}
          tittle={"Daily"}
          highlight={"Deals"}
        />
      </div>
    </div>
  );
};

651;
export default Home;
