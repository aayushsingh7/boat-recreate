import React from "react";
import styles from "../styles/Home.module.css";
import TextTransition, { presets } from "react-text-transition";
import heroSectionImages from "../json/heroSectionImages.json";

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
      {/* <span className={styles.texture}></span> */}
      <section className={styles.text_container}>
        <p>Listening music becomes fun with</p>
        <h2>
          <p>
            bo<span style={{ color: "red" }}>A</span>t
          </p>
          <p>
            {" "}
            <TextTransition translateValue="30%" springConfig={presets.default}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </p>
        </h2>
        {/* <p>BoAt Lifestyle is India’s fastest growing audio and wearables brand. They have a wide range of wireless earphones, earbuds, headphones, smart watches, and home audio. Whether you're working out or on an adventure, BoAt will get you sailing!</p> */}
        <div className={styles.btn_container}>
          <button
            className={styles.one}
            style={{ background: "var(--secondary-background)" }}
          >
            Show now
          </button>
          <button className={styles.one}>About us</button>
        </div>
      </section>
      <section className={styles.img_container}>
        <div className={styles.slider}>
          {heroSectionImages.map((image, index) => {
            return <img src={image} alt={`slider-${index}`} />;
          })}
        </div>
      </section>
    </div>
  );
};

651;
export default Home;
