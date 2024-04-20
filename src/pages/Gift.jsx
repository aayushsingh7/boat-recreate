import React, { useState } from "react";
import Animate from "../animation/Animate";
import dailyDeals from "../json/dailyDeals.json";
import newLaunches from "../json/newLaunches.json";
import Slider from "../layouts/Slider";
import styles from "../styles/Gift.module.css";
import { Helmet } from "react-helmet";

const Gift = () => {
  const [selectedFilter, setSelectedFilter] = useState("Grand Parents");

  const category = [
    {
      type: "Grand Parents",
      url: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,q_85,w_200/v1712652892/boat-recreate/images/d01363a306efdb0d529a91fdda8f6227-removebg-preview_ehyiey.webp",
    },
    {
      type: "Siblings",
      url: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_200,q_86,w_200/v1712653136/boat-recreate/images/watercolor-siblings-illustration_23-2149550719-removebg-preview_v1iglf.webp",
    },
    {
      type: "Friends",
      url: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_200,q_84/v1712653440/boat-recreate/images/nnn-removebg-preview_h7kxrv.webp",
    },
    {
      type: "Partner",
      url: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_200,q_84,w_250/v1712652886/boat-recreate/images/boyfriend-hugging-happy-girlfriend-holding-big-comic-heart-cheerful-cartoon-couple-flat-vector-illustration-love-romance-relationship-concept-banner-website-design-landing-web-page_74855-23969-removeb_qpoklr.webp",
    },
    {
      type: "Children",
      url: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_200,q_83/v1712652870/boat-recreate/images/168089080-happy-family-with-son-and-daughter-parents-hugging-children-vector-illustration-removebg-preview_fu17yc.webp",
    },
  ];

  const categories_two = [
    "Audiophiles",
    "Gamers",
    "Workaholics",
    "Artists",
    "Fitness Fanatic",
  ];
  const categories_three = [
    "Love Out Loud - 2024",
    "New Year",
    "Birthday",
    "Anniversary",
    "Wedding",
  ];

  const changeFilterOption = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" name="description" content="Gift with boAt (Gifting)." />
        <title>Gift With boAt</title>
        <link rel="canonical" href="http://localhost:4173/gift" />
      </Helmet>

      <Animate type={"topToBottom"} overflowHidden={false}>
        <img
          className={`${styles.main_img} ${styles.pc}`}
          src={"./images/gift-hero.webp"}
          alt="gift-hero-image"
          loading="eager"
        />
        <img
          className={`${styles.main_img} ${styles.mob}`}
          src="./images/gift-mob-hero.webp"
          alt="gift-hero-image"
          loading="eager"
        />
      </Animate>

      <div className="add-padding-container">
        <section className={styles.category_section}>
          <Animate delay={0.30} type={"topToBottom"} overflowHidden={true}> <h2>
            Choose a <span className={styles.under_line}>Category</span>
          </h2>
          </Animate>
          <div className={styles.slider}>
            {category.map((data, index) => {
              return (
                <Animate
                  key={index}
                  delay={index * 0.2}
                  type={"topToBottom"}
                  overflowHidden={false}
                >
                  <div
                    className={styles.box}
                    onClick={() => changeFilterOption(data.type)}
                  >
                    <div className={styles.img_container}>
                      <img
                        src={data.url}
                        className={
                          selectedFilter === data.type ? styles.active : null
                        }
                        alt={data.url}
                      />
                    </div>
                    <p>{data.type}</p>
                  </div>
                </Animate>
              );
            })}
          </div>

          <Slider
            data={dailyDeals}
            type={"product-slider"}
            newFilterSelected={selectedFilter}
          />
        </section>
      </div>

      <Animate overflowHidden={false} type={"topToBottom"}>
        <img
          className={styles.main_img}
          src="https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_866,q_87/v1712657503/boat-recreate/images/gift-page-2_bokqpq.webp"
          alt="gift-page-second-image"
        />
      </Animate>

      <div className="add-padding-container">
        <Slider
          data={dailyDeals}
          type={"product-slider"}
          tittle={"For"}
          highlight={"Speical Days"}
          filterReq={true}
          categories={categories_three}
        />
        <Slider
          data={newLaunches}
          type={"product-slider"}
          tittle={"By"}
          highlight={"Passion"}
          filterReq={true}
          categories={categories_two}
        />

        <div className={styles.img_sep}>
          <Animate overflowHidden={true} type={"leftToRight"}>
            {" "}
            <div>
              <img
                src="https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_500,q_88/v1712657198/boat-recreate/images/sep2_am8blf.webp"
                alt="gift-image"
              />
            </div>
          </Animate>

          <Animate overflowHidden={true} type={"rightToLeft"}>
            <div>
              <img
                src="https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_500,q_88/v1712657297/boat-recreate/images/sep1_sdlizk.webp"
                alt="gift-image"
              />
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default Gift;
