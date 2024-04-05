import React, { useContext, useState } from 'react'
import styles from '../styles/ReviewBox.module.css'
import { AiFillDislike, AiFillLike, AiFillStar, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { AppContext } from '../context/Context'

const ReviewBox = ({ review }) => {

    const { user } = useContext(AppContext)
    const [likes, setLikes] = useState([])
    const [dislike, setDislike] = useState([])


    const addLike = () => {
      removeDislike()
        setLikes((oldData) => {
            return [...oldData, user.id]
        })
    }

    const removeLike = () => {
        setLikes((oldData) => {
            return oldData.filter((data) => data !== user.id)
        })
    }

    const addDislike = () => {
        removeLike()
        setDislike((oldData) => {
            return [...oldData, user.id]
        })
    }

    const removeDislike = () => {
        setDislike((oldData) => {
            return oldData.filter((data) => data !== user.id)
        })
    }


    return (
        <div className={styles.grid_box}>
            <div className={styles.header}>
                <IoPersonCircleSharp />
                <div className={styles.user_details}>
                    <p className={styles.name}>{review.username} <span className={styles.seprator} style={{margin:"0px 4px"}}>|</span> <span className={styles.posted_date}>Posted on {review.reviewed_on}</span></p>
                    <span className={styles.verified}>Verified Customer  <RiVerifiedBadgeFill
                        style={{
                            fontSize: "15px",
                            marginLeft: "2px",
                            color: "#00da00",
                        }} /></span>
                </div>
            </div>

            <div className={styles.stars}><AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <span>{review.review_title}</span>
            </div>

            <p className={styles.review_description}>{review.review_description}</p>


         {
            review.review_images.length > 0 && 
            <div className={styles.review_images}>
            {review.review_images.map((image,index)=> {
             return <img src={image} key={index} alt="" />
            })}
                 </div>
         }

            <div className={styles.response_options}>
                <div>{likes.includes(user.id) ? <AiFillLike onClick={removeLike} /> : <AiOutlineLike onClick={addLike} />}{likes.length}</div>
                <span className={styles.seprator}>|</span>
                <div>{dislike.includes(user.id) ? <AiFillDislike onClick={removeDislike} /> : <AiOutlineDislike onClick={addDislike} />}{dislike.length}</div>
                <span className={styles.seprator}>|</span>
                <button>Report</button>
            </div>

        </div>
    )
}

export default ReviewBox