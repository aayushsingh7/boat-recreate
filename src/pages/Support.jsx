import React, { useState } from 'react'
import styles from '../styles/Support.module.css'
import Button from '../components/Button'
import { RiCustomerService2Line } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { IoTimerOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";





const Support = () => {
  const [dropDown, setDropDown] = useState(false)
  const [query, setQuery] = useState("")
  return (
    <div className={styles.container}>

      <section className={styles.hero_section}>
        <h1 className={styles.heading}>bo<span>A</span>t Support</h1>
        <div className={styles.hero_section_div}>
          <div className={styles.box}>
            <BsCashCoin />
            <h4>Payment Issue</h4>
            <p>Check your payment related queries here</p>
            <Button fontSize="0.7rem" padding="7px 30px" color="var(--primary-color)" borderRadius="50px" border="1px solid var(--primary-color)" text={"Discover how →"} marginTop="20px" background="none" />
          </div>

          <div className={styles.box}>
            <FaExchangeAlt />
            <h4>Exchange Policy</h4>
            <p>Check your exchange policies and methods</p>
            <Button fontSize="0.7rem" padding="7px 30px" color="var(--primary-color)" borderRadius="50px" border="1px solid var(--primary-color)" text={"Discover how →"} marginTop="20px" background="none" />
          </div>

          <div className={styles.box}>
            <RiCustomerService2Line />
            <h4>Order Related</h4>
            <p>Find order related questions and answers</p>
            <Button fontSize="0.7rem" padding="7px 30px" color="var(--primary-color)" borderRadius="50px" border="1px solid var(--primary-color)" text={"Discover how →"} marginTop="20px" background="none" />
          </div>

          <div className={styles.box}>
            <RiCustomerService2Line />
            <h4>Service Centers</h4>
            <p>Find authorised service centers around you</p>
            <Button fontSize="0.7rem" padding="7px 30px" color="var(--primary-color)" borderRadius="50px" border="1px solid var(--primary-color)" text={"Discover how →"} marginTop="20px" background="none" />
          </div>

          <div className={styles.box}>
            <GrMapLocation />
            <h4>Track Your Order</h4>
            <p>Check the status of your order</p>
            <Button fontSize="0.7rem" padding="7px 30px" color="var(--primary-color)" borderRadius="50px" border="1px solid var(--primary-color)" text={"Discover how →"} marginTop="20px" background="none" />
          </div>

          <div className={styles.box}>
            <IoTimerOutline />
            <h4>Track Warranty Ticket</h4>
            <p>Check the status of your warrantly ticket</p>
            <Button fontSize="0.7rem" padding="7px 30px" color="var(--primary-color)" borderRadius="50px" border="1px solid var(--primary-color)" text={"Discover how →"} marginTop="20px" background="none" />
          </div>
        </div>
      </section>


      <section className={styles.second_section}>
        <div className={styles.part_1}>
          <h4>How to <span>troubleshoot</span> your product?</h4>
          <p>You can easily troubleshoot this way <span>→</span></p>
        </div>
        <div className={styles.part_2}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/Q_-UVj0Rug8?si=_HzTbEUWFnWV9tD0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </section>



      <div className={styles.third_section}>
        {/* <h2 className={styles.heading}>Contact Us</h2> */}
        {/* <div className={styles.sep_1}>  */}
        <section className={styles.form_section}>

          <form onSubmit={(e) => e.preventDefault()}>
            <h2>✨Contact Us✨</h2>
            <div className={styles.details_container}>
              <input name='email' type="email" placeholder='Enter your Email' autoComplete='off' />

              <div className={styles.drop_container}>

                <input name='queryType' type="text" value={query} placeholder='Please select your topic' onClick={() => setDropDown(!dropDown)} readOnly />
                {
                  dropDown ? <div className={`${styles.drop_down_menu}`} onClick={() => setDropDown(!dropDown)}>
                    <p onClick={() => setQuery("Product Related")}>Product Related</p>
                    <p onClick={() => setQuery("Exchanging Issue")}>Exchanging Issue</p>
                    <p onClick={() => setQuery("Order Related")}>Order Related</p>
                    <p onClick={() => setQuery("Shipping")}>Shipping Related</p>
                    <p onClick={() => setQuery("Payment Issue")}>Payment Issue</p>
                    <p onClick={() => setQuery("Warranty FAQs")}>Warranty FAQs</p>
                  </div> : null
                }

              </div>

              <textarea name='description' placeholder='Tell us your Problem/Query in Detail...' autoComplete='off'></textarea>


            </div>


            <Button text={"Submit Request"} padding="15px" fontSize="0.8rem" fontWeight="600" color="var(--primary-color)" background="var(--secondary-background)" borderRadius="10px" marginTop="70px" width="100%" />


          </form>

        </section>
        <section className={styles.image_section}></section>
      </div>

 
     




    </div>
  )
}

export default Support