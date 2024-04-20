import React, { useContext, useMemo, useState } from "react";
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineLike
} from "react-icons/ai";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Animate from "../animation/Animate";
import { AppContext } from "../context/Context";
import styles from "../styles/ReviewBox.module.css";
import Button from "./Button";

const ReviewBox = ({ review, type }) => {
    const { user } = useContext(AppContext);
    const [likes, setLikes] = useState([]);
    const [dislike, setDislike] = useState([]);

    const addLike = () => {
        removeDislike();
        setLikes((oldData) => {
            return [...oldData, user.id];
        });
    };

    const removeLike = () => {
        setLikes((oldData) => {
            return oldData.filter((data) => data !== user.id);
        });
    };

    const addDislike = () => {
        removeLike();
        setDislike((oldData) => {
            return [...oldData, user.id];
        });
    };

    const removeDislike = () => {
        setDislike((oldData) => {
            return oldData.filter((data) => data !== user.id);
        });
    };


    const totalStars = useMemo(() => review.review_stars, []);
    const fullStars = useMemo(() => Math.floor(totalStars), [])
    const hasHalfStar = useMemo(() => totalStars % 1 !== 0, [])
    const emptyStars = useMemo(() => 5 - fullStars - (hasHalfStar ? 1 : 0), [])


    return (
        <Animate overflowHidden={true} type={"rightToLeft"} width={"100%"}>
            <div
                className={type === "fixed" ? styles.grid_box_fixed : styles.grid_box}
            >
                <div className={styles.header}>
                    <IoPersonCircleSharp />
                    <div className={styles.user_details}>
                        <p className={styles.name}>
                            {review.username}{" "}
                            <span className={styles.seprator} style={{ margin: "0px 4px" }}>
                                |
                            </span>{" "}
                            <span className={styles.posted_date}>
                                Posted on {review.reviewed_on}
                            </span>
                        </p>
                        <span className={styles.verified}>
                            Verified Customer{" "}
                            <RiVerifiedBadgeFill
                                style={{
                                    fontSize: "15px",
                                    marginLeft: "2px",
                                    color: "#00da00",
                                }}
                            />
                        </span>
                    </div>
                </div>

                <div className={styles.stars}>

                    <div className={styles.stars_con_s}>
                        {!isNaN(fullStars) && fullStars >= 0 && [...Array(fullStars)].map((_, i) => (
                            <BsStarFill key={i} />
                        ))}

                        {hasHalfStar && <BsStarHalf />}

                        {!isNaN(emptyStars) && emptyStars >= 0 && [...Array(emptyStars)].map((_, i) => (
                            <BsStar key={i} />
                        ))}
                    </div>

                    <span>{review.review_title}</span>
                </div>

                <div className={styles.overflow_scroll_container}>
                    <p className={styles.review_description}>
                        {review.review_description}
                    </p>

                    {review.review_images.length > 0 && (
                        <div className={styles.review_images}>
                            {review.review_images.map((image, index) => {
                                return <img src={image} key={index} alt="" width={66} height={88} />;
                            })}
                        </div>
                    )}
                </div>

                <div className={styles.response_options}>
                    <div>
                        {likes.includes(user?.id) ? (
                            <AiFillLike onClick={removeLike} />
                        ) : (
                            <AiOutlineLike onClick={addLike} />
                        )}
                        {likes.length}
                    </div>
                    <span className={styles.seprator}>|</span>
                    <div>
                        {dislike.includes(user?.id) ? (
                            <AiFillDislike onClick={removeDislike} />
                        ) : (
                            <AiOutlineDislike onClick={addDislike} />
                        )}
                        {dislike.length}
                    </div>
                    <span className={styles.seprator}>|</span>
                    <Button
                        label={"Report this review"}
                        text={"Report"}
                        padding="6px 20px"
                        fontSize="0.65rem"
                        borderRadius="5px"
                        background="var(--mid-dark-background)"
                    />
                </div>
            </div>
        </Animate>
    );
};

export default ReviewBox;
