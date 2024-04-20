import React, { useContext, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsEmojiFrownFill } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ProductBox from "../components/ProductBox";
import { AppContext } from "../context/Context";
import styles from "../styles/SearchResult.module.css";
import convertToLowerCase from "../utils/convertToLowerCase";
import formatURL from "../utils/formatURL";
import mergedArray from "../utils/mergeJsonArray";
import textFormatter from "../utils/textFormatter";
import { Helmet } from "react-helmet";

const SearchResults = () => {
  const navigate = useNavigate();
  const [star, setStar] = useState({ minStar: null, maxStar: null });
  const [price, setPrice] = useState({ minPrice: null, maxPrice: null });
  const [category, setCategory] = useState("");

  const { setShowFilters, showFilters } = useContext(AppContext);
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get("query");
  const maxPriceQuery = q.get("max-price");
  const minPriceQuery = q.get("min-price");
  const maxStarQuery = q.get("max-star");
  const minStarQuery = q.get("min-star");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPrice({ minPrice: minPriceQuery, maxPrice: maxPriceQuery });
    setStar({ minStar: minStarQuery, maxStar: maxStarQuery });
    setCategory(query);
  }, [location.search]);

  const handleNavigation = () => {
    const url = new URL(window.location.href);
    const newUrl = formatURL(
      `${url.pathname}?query=${category ? category : query}${price.minPrice && price.maxPrice
        ? `&&min-price=${price.minPrice}&&max-price=${price.maxPrice}`
        : ""
      }${star.minStar && star.maxStar
        ? `&&min-star=${star.minStar}&&max-star=${star.maxStar}`
        : ""
      }`
    );

    navigate(newUrl);
  };

  useEffect(() => {
    setLoading(true);
    const priceCheck = minPriceQuery && maxPriceQuery;
    const starCheck = minStarQuery && maxStarQuery;

    const filterByPrice = (product) => {
      const r =
        !priceCheck ||
        (product.price > minPriceQuery && product.price < maxPriceQuery);
      return r;
    };
    const filterByStars = (product) => {
      return (
        !starCheck ||
        (minStarQuery == 5
          ? product.reviewStars == 5
          : product.reviewStars > minStarQuery &&
          product.reviewStars < maxStarQuery)
      );
    };
    const filterByQuery = (product) => {
      if (!product) return;
      return (
        query === "all" ||
        convertToLowerCase(product.type).includes(convertToLowerCase(query)) ||
        convertToLowerCase(product.name).includes(convertToLowerCase(query)) ||
        convertToLowerCase(product.description).includes(
          convertToLowerCase(query)
        )
      );
    };

    setData(
      mergedArray.filter(
        (product) =>
          filterByQuery(product) &&
          filterByPrice(product) &&
          filterByStars(product)
      )
    );
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, [location.search]);

  return (
    <>
      <div
        onClick={() => setShowFilters(false)}
        className={`${styles.shadow} ${showFilters ? styles.show_shadow : styles.hide_shadow
          }`}
      ></div>

      <Helmet>
        <meta charSet="utf-8" name="description" content="Search Earphones, Headphones, Earbuds, etc..." />
        <title>{`Search for ${textFormatter(query)}`}</title>
      </Helmet>

      <div className={styles.container} style={{ minHeight: "100dvh" }}>
        <section
          className={`${styles.search_filter_sidenav} ${showFilters ? styles.show : styles.hide
            }`}
        >
          <div className={styles.options_container}>
            <div className={styles.div_style} style={{ marginTop: "0px" }}>
              <h4>Customer reviews</h4>

              <div style={{ marginTop: "3px" }} className={styles.dd}>
                {" "}
                <label
                  className={styles.stars}
                  onClick={() => setStar({ minStar: 5, maxStar: 5 })}
                >
                  <input
                    type="radio"
                    name="star"
                    checked={star.minStar == 5 ? true : false}
                  />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </label>
                <label
                  className={styles.stars}
                  onClick={() => setStar({ minStar: 4, maxStar: 5 })}
                >
                  <input
                    type="radio"
                    name="star"
                    checked={star.minStar == 4 ? true : false}
                  />

                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <span> & above</span>
                </label>
                <label
                  className={styles.stars}
                  onClick={() => setStar({ minStar: 3, maxStar: 5 })}
                >
                  <input
                    type="radio"
                    name="star"
                    checked={star.minStar == 3 ? true : false}
                  />

                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <span> & above</span>
                </label>
                <label
                  className={styles.stars}
                  onClick={() => setStar({ minStar: 2, maxStar: 5 })}
                >
                  <input
                    type="radio"
                    name="star"
                    checked={star.minStar == 2 ? true : false}
                  />

                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <span> & above</span>
                </label>
                <label
                  className={styles.stars}
                  onClick={() => setStar({ minStar: 1, maxStar: 5 })}
                >
                  <input
                    type="radio"
                    name="star"
                    checked={star.minStar == 1 ? true : false}
                  />

                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />

                  <AiOutlineStar />
                  <AiOutlineStar />
                  <span> & above</span>
                </label>
              </div>
            </div>

            <div className={styles.div_style}>
              <h4>Price</h4>
              <label
                onClick={() => setPrice({ minPrice: 100, maxPrice: 1000 })}
              >
                <input
                  type="radio"
                  name="price"
                  checked={price.minPrice == 100 ? true : false}
                />
                <p>Under ₹1000</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 1000, maxPrice: 1500 })}
              >
                <input
                  type="radio"
                  name="price"
                  checked={price.minPrice == 1000 ? true : false}
                />{" "}
                <p>₹1000 - ₹1500</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 1500, maxPrice: 2000 })}
              >
                <input
                  type="radio"
                  name="price"
                  checked={price.minPrice == 1500 ? true : false}
                />
                <p>₹1500 - ₹2000</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 2000, maxPrice: 2500 })}
              >
                <input
                  type="radio"
                  name="price"
                  checked={price.minPrice == 2000 ? true : false}
                />
                <p>₹2000 - ₹2500</p>
              </label>
              <label
                onClick={() =>
                  setPrice({ minPrice: 2500, maxPrice: 100000000 })
                }
              >
                <input
                  type="radio"
                  name="price"
                  checked={price.minPrice == 2500 ? true : false}
                />{" "}
                <p>₹2500 & above </p>
              </label>
            </div>

            <div className={styles.div_style}>
              <h4>Shop by Category</h4>

              <label onClick={() => setCategory("headphones")}>
                <input
                  type="radio"
                  name="category"
                  checked={category.includes("headphones") ? true : false}
                />
                <p>Headphones</p>
              </label>
              <label onClick={() => setCategory("earbuds")}>
                <input
                  type="radio"
                  name="category"
                  checked={category.includes("earbuds") ? true : false}
                />{" "}
                <p>Earbuds</p>
              </label>
              <label onClick={() => setCategory("speakers")}>
                <input
                  type="radio"
                  name="category"
                  checked={category.includes("speakers") ? true : false}
                />
                <p>Speakers</p>
              </label>
              <label onClick={() => setCategory("smartwatches")}>
                <input
                  type="radio"
                  name="category"
                  checked={category.includes("smartwatches") ? true : false}
                />
                <p>Smart Watches</p>
              </label>
              <label onClick={() => setCategory("earphones")}>
                <input
                  type="radio"
                  name="category"
                  checked={category.includes("earphones") ? true : false}
                />{" "}
                <p>Earphones</p>
              </label>
            </div>
          </div>

          <div className={styles.btn_container}>
            <Button
              label={"Reset all filters"}
              onClick={() => {
                navigate(`/search?query=${query}`);
                setPrice({ minPrice: null, maxPrice: null });
                setStar({ minStar: null, maxStar: null });
              }}
              text={"Clear"}
              padding="14px"
              fontWeight="600"
              fontSize="0.8rem"
              color="var(--primary-color)"
              borderRadius="10px"
              background="var(--mid-dark-background)"
              width="100%"
            />

            <Button
              label={"Apply filters"}
              onClick={handleNavigation}
              text={"Apply"}
              padding="14px"
              fontWeight="600"
              fontSize="0.8rem"
              color="var(--primary-color)"
              borderRadius="10px"
              background="var(--secondary-background)"
              width="100%"
            />
          </div>
        </section>

        <section className={styles.results}>
          <h2>
            Showing results for <span>{textFormatter(query)}</span>
          </h2>
          {data.length == 0 && !loading ? null : (
            <button
              label="Open filters"
              className={styles.filters_btn}
              onClick={() => setShowFilters(true)}
            >
              <IoFilterSharp /> Apply Filters
            </button>
          )}

          {data.length == 0 && !loading ? (

            <div className={styles.no_result}>
              <BsEmojiFrownFill />
              <h5>No Result Found</h5>
              <p>
                Sorry, no results found. Please double-check your spelling and try again. Consider remvoing or using different filters for better results.
              </p>
            </div>

          ) : (
            <div className={styles.grid_container}>
              {data.map((product, index) => {
                return (
                  <ProductBox
                    changePermit={false}
                    key={index}
                    product={product}
                    productIndex={index}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchResults;
