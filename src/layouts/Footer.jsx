import React from 'react';
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import styles from '../styles/Footer.module.css';
import logo from '/images/dark-logo.png';



const Footer = () => {
  return (
   <footer className={styles.container}>
    <section className={styles.section_one}>

      <div className={styles.email_container}>
        <img src={logo} alt="" />
        <p>Subscribe to our email alerts!</p>
        <input type="text"  autoComplete='off' placeholder={"Enter your email address"} />
      </div>

    <div  className={styles.seprator}>
    <div className={styles.component}>
          <h4>Shop</h4>
          <span>True Wireless Earbuds</span>
          <span>Gaming Headphones</span>
          <span>Wireless Speakers</span>
          <span>Soundbars</span>
          <span>Smart Watches</span>
          <span>Car Accessories</span>
          <span>Chargers</span>
          <span>Cables</span>
          <span>Powerbanks</span>
      </div>


      <div className={styles.component}>
          <h4>Help</h4>
          <span>Track Your Order</span>
          <span>Warrenty & Support</span>
          <span>Return Policy</span>
          <span>Service Centers</span>
          <span>Bulk Orders</span>
          <span>FAQs</span>
          <span>Why Buy Direct</span>
      </div>


      <div className={styles.component}>
          <h4>Company</h4>
        <span>About boAt</span>
        <span>News</span>
        <span>Read Our Blog</span>
        <span>Careers</span>
        <span>Security</span>
        <span>Investor Relations</span>
        <span>Warranty Policy</span>
      </div>

    </div>

      
    </section>



    <section className={styles.section_two}>
      <div className={styles.social_handles}>
        <h4>Let's get social</h4>
        <div className={styles.social_options}>
          <FaFacebookF/>
          <BsInstagram/>
          <BsTwitterX/>
          <FaYoutube/>
        </div>
      </div>

      <div className={styles.ran}>
        <span style={{cursor:"pointer"}}>Privacy Policy</span>
      <span style={{margin:"0px 10px"}}>•</span>
  <span style={{cursor:"pointer"}}>Terms & Conditions</span>

      </div>

     <div className={styles.rights}>
     <span className={styles.light_span}>© 2024 Imagine Marketing Limited. All Rights Reserved.</span>

<span className={styles.light_span}>For queries contact us: Manager, Imagine Marketing Limited Unit no. 204 & 205, 2nd floor, D-wing & E-wing, Corporate Avenue, Andheri Ghatkopar Link Road, Mumbai, Maharashtra-400093, India</span>
     </div>


    </section>
   
   </footer>
  )
}

export default Footer