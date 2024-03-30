import React, { useEffect } from "react";
import styles from "../styles/About.module.css";
import { Link } from "react-router-dom";
import achievements from '../json/achievements.json'

const About = () => {
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior:'instant' })
  }, []);

  return (
    <div id="about" className={styles.container}>
      <h2 className={styles.h2}>
        About{" "}
        <span className={styles.under_line}>
          bo<span style={{ color: "var(--secondary-background)" }}>A</span>t
        </span>
      </h2>

      <section className={styles.section_one}>
        <h2>boAt set sail in 2014</h2>
        <p className={styles.p}>
          During one of their many explorations, our founders{" "}
          <span className={styles.bold}>Aman Gupta</span> and{" "}
          <span className={styles.bold}>Sameer Mehta</span> discovered that the
          dopest people of our land were in search of{" "}
          <span className={styles.bold_red}>affordable, durable</span> and{" "}
          <span className={styles.bold_red}>ultra fashionable</span> audio
          products to groove to.
        </p>

        <p className={styles.p}>
          Thus, in 2014, they kickstarted a great voyage in Indian consumer
          waters.
        </p>
      </section>

      <section className={styles.section_two}>
        <h2>The aim of this journey?</h2>
        <span>Self discovery as an Indian</span>
      </section>

      <section className={styles.section_three}>
        <p>AND THAT'S WHERE THE BOATHEADS CAME INTO PICTURE.</p>
        <img src="/images/about2.webp" alt="boatheads" />
      </section>

      <section className={styles.section_four}>
        <h2>Our achievements speak for themselves</h2>

        <div className={styles.box_container}>

         {
          achievements.map((data,index)=> {
            return (
              <div  key={index} className={`${styles.box}`}>
              <div className={styles.img_cont}>
                <img src={data.image} alt="" />
              </div>
              <div className={styles.des}>
                <p>{data.description}</p>
              </div>
            </div>
            )
          })
         }

        </div>
      </section>

      <section className={styles.section_five}>
        <h2>What's Next ?</h2>

        <p className={styles.p}>
        All that has happened to us is overwhelming, yes, but it <span className={styles.bold_red}>pushes us to do more</span>, be more and make more products that you can use to <span className={styles.bold}>jazz up your lifestyle</span>.
        </p>

        <p className={styles.p}>
        So, in 2021, we've started to <span className={styles.bold_red}>fearlessly rock in India</span> with a range of products that <span className={styles.bold}>free-spirited Indians like you can truly call your own!.</span>
        </p>
      </section>


   <Link to={"/"}> <button className={styles.home_btn}>Back to Home</button></Link>

    </div>
  );
};

export default About;
