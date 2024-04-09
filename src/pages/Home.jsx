import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TextTransition, { presets } from "react-text-transition";
import Button from "../components/Button";
import bestSellerCategoriesVideos from "../json/bestSellerCategories.json";
import dailyDeals from "../json/dailyDeals.json";
import heroSectionImages from "../json/heroSectionImages.json";
import newLaunches from "../json/newLaunches.json";
import CategorySlider from "../layouts/CategorySlider";
import Slider from "../layouts/Slider";
import styles from "../styles/Home.module.css";
import reviews from '../json/reviews.json'
import ImageSlider from "../layouts/ImageSlider";

const TEXTS = [
  "Headphones",
  "Speakers",
  "Earbuds",
  "Earphones",
  "Trimmers",
  "SoundBox",
];

const Home = () => {

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
          {/* <p>Listening music becomes fun with</p> */}
          <h2>
            {/* <p> */}
              bo<span style={{ color: "red",fontWeight:"600" }}>A</span>t
            {/* </p> */}
            <div style={{fontWeight:"600"}} className={styles.custom}>
              {" "}
              <TextTransition
                translateValue="30%"
                
                springConfig={presets.default}
              >
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </div>
          </h2>
          {/* <p>BoAt Lifestyle is India’s fastest growing audio and wearables brand. They have a wide range of wireless earphones, earbuds, headphones, smart watches, and home audio. Whether you're working out or on an adventure, BoAt will get you sailing!</p> */}
          <div className={styles.btn_container}>
            <a href="#home-products" style={{ textDecoration: "none" }}>
              <Button padding="12px 30px" borderRadius="5px" fontSize="1rem"
                margin="10px" background="var(--secondary-background)" 
                text={"Shop now"}
              />
            </a>
            <Link to={"/about"}>
            <Button padding="12px 30px" borderRadius="5px" fontSize="1rem"
                margin="10px" background="var(--mid-dark-background)" 
                text={"About Us"}
              />
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
        <span className={styles.cutter}></span>
      </section>

      <div className="add-padding-container" id="home-products">
        <Slider
          data={bestSellerCategoriesVideos}
          type={"video-slider"}
          tittle={"Explore"}
          highlight={"Best Sellers"}
          counter={false}
        />



<Slider
          data={dailyDeals}
          type={"product-slider"}
          tittle={"Daily"}
          highlight={"Deals"}
          counter={true}
        />
        <section>
          <h2>
            Shop by <span className={styles.under_line}>Categories</span>
          </h2>
          <CategorySlider />
        </section>

        <Slider
          data={newLaunches}
          type={"product-slider"}
          tittle={"New"}
          highlight={"Launches"}
          counter={false}
        />

        <Slider
        data={reviews}
        type={"review-slider"}
        tittle={"Customers"}
        highlight={"Reviews"}
        counter={false} />
        
      <ImageSlider 
      tittle={"In the"} 
      highlight={"Press"}/>

      </div>
    </div>
  );
};

651;
export default Home;
