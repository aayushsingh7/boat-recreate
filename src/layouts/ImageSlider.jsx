import React from 'react'
import { useState } from 'react'
import styles from '../styles/ImageSlider.module.css'
import Button from '../components/Button'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiSolidQuoteRight } from "react-icons/bi";


const ImageSlider = ({ tittle, highlight }) => {

    const data = [
        {
            image: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_200,q_87,w_600/v1712481420/boat-recreate/images/bw_business-removebg-preview_bp6j3h.webp",
            text: "boAt is the first company from the consumer lifestyle electronics industry to collaborate with the ICEA to bring out the Indigenous IP."
        },
        {
            image: "https://res.cloudinary.com/dvk80x6fi/image/upload/v1712481399/boat-recreate/images/business-standard-removebg-preview_nm0ujg.webp",
            text: "Audio brand boAt scales up to Rs 4,000 crore in net sales for FY 2022-23."
        },
        {
            image: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_300,q_87,w_600/v1712481644/boat-recreate/images/fasion-network_v035ug.webp",
            text: "Boat, India’s leading wearables brand has named Indian cricketer Jemimah Rodrigues as the newest brand ambassador."
        },
        {
            text: "Boat launches its first 4G calling smartwatch, Boat Lunar Pro LTE.",
            image: "https://res.cloudinary.com/dvk80x6fi/image/upload/c_scale,h_200,q_87,w_600/v1712481962/boat-recreate/images/times-of-india-removebg-preview_jhmfie.webp"
        }
    ]

    const [imageIndex, setImageIndex] = useState(false)

    const handleNextClick = () => {
        setImageIndex(() => {
            if (imageIndex === data.length - 1) return 0
            return imageIndex + 1
        })
    }

    const handlePrevClick = () => {
        setImageIndex(() => {
            if (imageIndex === 0) return data.length - 1
            return imageIndex - 1
        })
    }



    return (
        <section className={styles.sec_tion}>
            {tittle && highlight ? (
                <h2>
                    {tittle} <span className={styles.under_line}>{`${highlight}`}</span>
                </h2>
            ) : null}

            <div className={styles.slider}>
                <Button onClick={handlePrevClick} text={<AiOutlineLeft style={{ fontSize: "18px", color: "var(--primary-color)" }} />} background="var(--secondary-background)" height="30px" width="30px" borderRadius="50%" position="absolute" top="50%" transform="translateY(-50%)" left="1%" zIndex="10" />
                {
                    data.map((data, index) => {
                        return (
                            <div key={index} className={styles.box} style={{ translate: `${-100 * imageIndex}%` }}>

                                <div className={styles.image_container}> <img src={data.image} alt="" />
                                </div>


                                <div className={styles.details}>

                                    <p> <BiSolidQuoteRight style={{
                                        transform: "rotateY(180deg)",
                                        marginRight: "5px",
                                        marginBlock: "2px", color: "var(--light-dark-background)"
                                    }
                                    } />{data.text} <BiSolidQuoteRight style={{
                                        color: "var(--light-dark-background)"
                                    }} /></p>

                                    <img src={data.image} alt="" />

                                </div>

                            </div>
                        )
                    })
                }

                <Button onClick={handleNextClick} text={<AiOutlineRight style={{ fontSize: "18px", color: "var(--primary-color)" }} />} background="var(--secondary-background)" height="30px" width="30px" borderRadius="50%" position="absolute" top="50%" transform="translateY(-50%)" right="1%" zIndex="10" />
            </div>

        </section>
    )
}

export default ImageSlider