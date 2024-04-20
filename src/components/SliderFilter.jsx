import React from "react";
import Animate from "../animation/Animate";
import styles from "../styles/SliderFilter.module.css";

const SliderFilter = ({ selectedFilter, setSelectedFilter, categories }) => {
  return (
    <Animate overflowHidden={true} type={"topToBottom"}>
      <div className={styles.container}>
        <ul>
          {categories.map((data) => {
            return (
              <li
                key={data}
                onClick={() => setSelectedFilter(`${data}`)}
                className={selectedFilter === data ? styles.active : null}
              >
                {data}
              </li>
            );
          })}
        </ul>
      </div>
    </Animate>
  );
};

export default SliderFilter;
