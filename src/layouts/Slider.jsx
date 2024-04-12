import React, { useEffect, useRef, useState } from "react";

import SliderBox from "../components/SliderBox";
import SliderFilter from "../components/SliderFilter";
import styles from "../styles/Slider.module.css";

const Slider = ({ data, type, highlight, tittle, counter, id, filterReq, categories, newFilterSelected }) => {

  const sliderRef = useRef(null);
  const [selectedVid, setSelectedVid] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState("")
  let selected;
  let startX;
  let scrollLeft;

  useEffect(() => {
    setSelectedFilter(newFilterSelected)
  }, [newFilterSelected])

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

  useEffect(() => {
    categories && setSelectedFilter(categories[0])
  }, [])


  return (
    <section className={styles.sec_tion}>
      {tittle && highlight ? (
        <h2>
          {tittle} <span className={styles.under_line}>{`${highlight}`}</span>
        </h2>
      ) : null}

      

      {
        filterReq ? <SliderFilter selectedFilter={selectedFilter} categories={categories} setSelectedFilter={setSelectedFilter} /> : null
      }


      <div className={styles.slider}>


        <div className={styles.slider_container} ref={sliderRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          {data.filter((product) => id ? product.id !== id : true).map((product, index) => {
            return (
              <SliderBox selectedVid={selectedVid} setSelectedVid={setSelectedVid} index={index} type={type} data={product} key={index} />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Slider;
