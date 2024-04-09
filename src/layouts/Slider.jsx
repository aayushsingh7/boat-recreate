import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import SliderBox from "../components/SliderBox";
import styles from "../styles/Slider.module.css";
import DealCounter from "./DealCounter";
import Button from "../components/Button";
import SliderFilter from "../components/SliderFilter";

const Slider = ({ data, type, highlight, tittle, counter, id, filterReq, categories, newFilterSelected}) => {

  const sliderRef = useRef(null);
  const [selectedVid, setSelectedVid] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState("")
  let selected;
  let startX;
  let scrollLeft;

  useEffect(()=> {
   setSelectedFilter(newFilterSelected)
  },[ newFilterSelected])

  // const updateButtonState = () => {

  //   const container = sliderRef.current;
  //   const hasNext =
  //     container.scrollLeft + container.clientWidth < container.scrollWidth - 1;
  //   setNextBtn(hasNext);

  //   const hasPrev = container.scrollLeft > 0;
  //   setPrevBtn(hasPrev);
  // };

  // const handleNextClick = () => {
  //   updateButtonState();
  //   sliderRef.current.scrollBy({
  //     left: sliderRef.current.clientWidth,
  //     behavior: "smooth",
  //   });
  // };

  // const handlePrevClick = () => {
  //   updateButtonState();
  //   sliderRef.current.scrollBy({
  //     left: -sliderRef.current.clientWidth,
  //     behavior: "smooth",
  //   });
  // };

  // useEffect(() => {
  //   if (sliderRef.current) {
  //     const ref = sliderRef.current;
  //     const handleScroll = () => {
  //       updateButtonState();
  //     };
  //     sliderRef.current.addEventListener("scroll", handleScroll);
  //     window.addEventListener("resize", handleScroll);
  //     handleScroll();
  //     return () => {
  //       ref.removeEventListener("scroll", handleScroll);
  //       window.removeEventListener("resize", handleScroll);
  //     };
  //   }
  // }, []);

  const handleMouseDown = (e) => {
    e.preventDefault()
    selected = true
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  }

  const handleMouseUp = (e) => {
    selected = false
  }

  const handleMouseMove = (e) => {
    if (!selected) return;
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk

  }

  useEffect(() => {
    if (!data) return
    data.sort(() => Math.random() - 0.5)
  }, [selectedFilter])

  useEffect(()=> {
   categories &&  setSelectedFilter(categories[0])
  },[])

  
  return (
    <section className={styles.sec_tion}>
      {tittle && highlight ? (
        <h2>
          {tittle} <span className={styles.under_line}>{`${highlight}`}</span>
        </h2>
      ) : null}

      {counter ? (
        <DealCounter />
      ) : null}

      {
        filterReq ? <SliderFilter selectedFilter={selectedFilter} categories={categories} setSelectedFilter={setSelectedFilter} /> : null
      }


      <div className={styles.slider}>
        {/* {prevBtn ? (
          <Button
            onClick={handlePrevClick}
            className={`${styles.prev}`}
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            padding="3px"
            width="40px"
            zIndex="10"
         boxShadow="0px 0px 4px 1px #313131"
            borderRadius="50%"
            height="40px"
            background="var(--primary-color)"
          text={ <AiOutlineLeft />}
          />
        ) : null} */}

        <div className={styles.slider_container} ref={sliderRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          {data.filter((product) => id ? product.id !== id : true).map((product, index) => {
            return (
              <SliderBox selectedVid={selectedVid} setSelectedVid={setSelectedVid} index={index} type={type} data={product} key={index} />
            );
          })}
        </div>
        {/* {nextBtn ? (
           <Button
           onClick={handleNextClick}
           className={`${styles.next}`}
           position="absolute"
           top="50%"
           transform="translateY(-50%)"
           padding="3px"
           width="42px"
           zIndex="10"
         boxShadow="0px 0px 4px 1px #313131"
           borderRadius="50%"
           height="42px"
           background="var(--primary-color)"
         text={ <AiOutlineRight />}
         />
        ) : null} */}
      </div>
    </section>
  );
};

export default Slider;
