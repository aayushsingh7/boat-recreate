import React from 'react'
import styles from '../styles/LoadingTemplate.module.css'

const LoadingTemplate = ({ type }) => {
    return (
        <>{
            type === "product-slider" ?
                <div
                    className={styles.product_container}
                >
                    <div className={styles.product_img}>

                    </div>

                    <div className={styles.details}>
                        <span style={{ width: "80%" }}></span>
                        <span style={{ width: "60%" }}></span>
                        <span style={{ width: "40%" }}></span>
                    </div>
                </div>

                :

                type === "review-slider" ? <div className={styles.grid_box_fixed}></div> :
                    type === "vid-slider" ? <div className={styles.vid_container} style={{ width: "50vw", height: "50vw" }}></div> : <h2>Loding...</h2>
        }
        </>
    )
}

export default LoadingTemplate