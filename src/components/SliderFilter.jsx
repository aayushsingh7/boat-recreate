import React from 'react'
import styles from '../styles/SliderFilter.module.css'

const SliderFilter = ({selectedFilter,setSelectedFilter,categories}) => {
  return (
    <div className={styles.container}>
    <ul>
      {categories.map((data)=> {
        return (
            <li key={data} onClick={()=> setSelectedFilter(`${data}`)} className={selectedFilter === data ? styles.active : null}>{data}</li>
        )
      })}
    </ul>
    </div>
  )
}

export default SliderFilter