import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Animate from "../animation/Animate";
import achievements from "../json/achievements.json";
import styles from "../styles/About.module.css";

const About = () => {

  return (
    <div id="about" className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" name="description" content="Sailing across the nation and beyond. Every boAthead out there is our anchor! Their love and support inspires us to never back down, even in turbulent waters." />
        <title>boAt - Who Are We? About us</title>
        <link rel="canonical" href="http://localhost:4173/about" />
      </Helmet>

      <Animate overflowHidden={true} type={"topToBottom"}>
        <h2 className={styles.h2}>
          About{" "}
          <span className={styles.under_line}>
            bo<span style={{ color: "var(--secondary-background)" }}>A</span>t
          </span>
        </h2>
      </Animate>

      <section className={styles.section_one}>
        <Animate overflowHidden={true} type={"topToBottom"} delay={0.2}>
          <h2>boAt set sail in 2014</h2>
        </Animate>
        <Animate delay={0.3} overflowHidden={true} type={"topToBottom"}>
          <p className={styles.p}>
            During one of their many explorations, our founders{" "}
            <span className={styles.bold}>Aman Gupta</span> and{" "}
            <span className={styles.bold}>Sameer Mehta</span> discovered that
            the dopest people of our land were in search of{" "}
            <span className={styles.bold_red}>affordable, durable</span> and{" "}
            <span className={styles.bold_red}>ultra fashionable</span> audio
            products to groove to.
          </p>
        </Animate>

        <Animate type={"topToBottom"} delay={0.4} overflowHidden={true}>
          <p className={styles.p}>
            Thus, in 2014, they kickstarted a great voyage in Indian consumer
            waters.
          </p>
        </Animate>
      </section>

      <Animate
        overflowHidden={true}
        type={"topToBottom"}
        width="100%"
        justifyContent="center"
        delay={0.5}
      >
        <section className={styles.section_two}>
          <h2>The aim of this journey?</h2>
          <span>Self discovery as an Indian</span>
        </section>
      </Animate>

      <section className={styles.section_three}>
        <Animate overflowHidden={true} type={"topToBottom"}>
          <p>AND THAT'S WHERE THE BOATHEADS CAME INTO PICTURE.</p>
        </Animate>
        <Animate overflowHidden={true} type={"topToBottom"} delay={0.3}>
          <img src="/images/about2.webp" alt="boatheads" />
        </Animate>
      </section>

      <section className={styles.section_four}>
        <Animate
          type={"topToBottom"}
          overflowHidden={true}
          width={"100%"}
          justifyContent="center"
        >
          <h2>Our achievements speak for themselves</h2>
        </Animate>

        <div className={styles.box_container}>
          {achievements.map((data, index) => {
            return (
              <Animate key={index} type={"bottomToTop"} overflowHidden={true}>
                <div className={`${styles.box}`}>
                  <div className={styles.img_cont}>
                    <img src={data.image} alt="" />
                  </div>
                  <div className={styles.des}>
                    <p>{data.description}</p>
                  </div>
                </div>
              </Animate>
            );
          })}
        </div>
      </section>

      <section className={styles.section_five}>
        <Animate type={"rightToLeft"} overflowHidden={false}>
          <h2>What's Next ?</h2>
        </Animate>

        <Animate type={"rightToLeft"} overflowHidden={false} delay={0.2}>
          <p className={styles.p}>
            All that has happened to us is overwhelming, yes, but it{" "}
            <span className={styles.bold_red}>pushes us to do more</span>, be
            more and make more products that you can use to{" "}
            <span className={styles.bold}>jazz up your lifestyle</span>.
          </p>
        </Animate>

        <Animate type={"rightToLeft"} overflowHidden={false} delay={0.3}>
          <p className={styles.p}>
            So, in 2021, we've started to{" "}
            <span className={styles.bold_red}>fearlessly rock in India</span>{" "}
            with a range of products that{" "}
            <span className={styles.bold}>
              free-spirited Indians like you can truly call your own!.
            </span>
          </p>
        </Animate>
      </section>

      <Animate type={"bottomToTop"} overflowHidden={true} delay={0.5}>
        <Link title="Go to home page" to={"/"}>
          {" "}
          <button aria-label="Back to home page" className={styles.home_btn}>Back to Home</button>
        </Link>
      </Animate>
    </div>
  );
};

export default About;
