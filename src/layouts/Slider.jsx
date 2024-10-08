import React, { lazy, useEffect, useRef, useState, useTransition } from "react";

import 'intersection-observer';
import Animate from "../animation/Animate";
import LoadingTemplate from "../components/LoadingTemplate";
import SliderFilter from "../components/SliderFilter";
import styles from "../styles/Slider.module.css";
const SliderBox = lazy(() => import("../components/SliderBox"))

const Slider = ({
  data,
  type,
  highlight,
  tittle,
  counter,
  id,
  filterReq,
  categories,
  newFilterSelected,
}) => {
  const containerRef = useRef(null)
  const sliderRef = useRef(null);
  const [selectedVid, setSelectedVid] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isPending, startTransition] = useTransition()
  const [inView, setInView] = useState(false)
  let selected;
  let startX;
  let scrollLeft;

  useEffect(() => {

    if (!containerRef.current) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(containerRef.current);

  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startTransition(() => {
          setInView(true)
        })
      }
    });
  };





  useEffect(() => {
    setSelectedFilter(newFilterSelected);
  }, [newFilterSelected]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    selected = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseUp = (e) => {
    selected = false;
  };

  const handleMouseMove = (e) => {
    if (!selected) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (!data || !filterReq) return;
    data.sort(() => Math.random() - 0.5);
  }, [selectedFilter]);

  useEffect(() => {
    categories && setSelectedFilter(categories[0]);
  }, []);

  return (
    <section className={styles.sec_tion}>
      {tittle && highlight ? (
        <Animate type={"topToBottom"} overflowHidden={true}>
          <h2 >
            {tittle} <span className={styles.under_line}>{`${highlight}`}</span>
          </h2>
        </Animate>
      ) : null}

      {filterReq ? (
        <SliderFilter
          selectedFilter={selectedFilter}
          categories={categories}
          setSelectedFilter={setSelectedFilter}
        />
      ) : null}

      <div className={styles.slider} ref={containerRef}>
        <div
          className={styles.slider_container}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
        {
          !inView ?
            <>
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
              <LoadingTemplate type={type} />
            </>
            :
            data
              .filter((product) => (id ? product.id !== id : true))
              .map((product, index) => {
                return (
                  <SliderBox
                    selectedVid={selectedVid}
                    setSelectedVid={setSelectedVid}
                    index={index}
                    type={type}
                    data={product}
                    key={index}
                  />
                );
              })
        }
        </div>
      </div>
    </section >
  );
};

export default Slider;
