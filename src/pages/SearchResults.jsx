import React, { useContext, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoFilterSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import ProductBox from "../components/ProductBox";
import { AppContext } from "../context/Context";
import styles from "../styles/SearchResult.module.css";
import formatURL from "../utils/formatURL";
import mergedArray from "../utils/mergeJsonArray";


const SearchResults = () => {
  const {setShowFilters,showFilters} = useContext(AppContext)
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get("query");
  const maxPrice = q.get("max-price");
  const minPrice = q.get("min-price");
  const maxStar = q.get("max-star");
  const minStar = q.get("min-star");
  const [data, setData] = useState([]);

  useEffect(() => {
    const priceCheck = minPrice && maxPrice;
    const starCheck = minStar && maxStar;

    const filterByPrice = (product) => {
      return !priceCheck || (product.price > minPrice && product.price < maxPrice );
    };
    const filterByStars = (product) => {
      return (
        !starCheck ||
        (minStar == 5
          ? product.reviewStars == 5
          : product.reviewStars > minStar && product.reviewStars < maxStar)
      );
    };
    const filterByQuery = (product) => {
      return query === "all" || product.type?.toLowerCase().replace(/\s/g, "").includes(query.replace(/-/g, "")) || product.name?.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query)
    };

    setData(
      mergedArray.filter(
        (product) =>
          filterByQuery(product) &&
          filterByPrice(product) &&
          filterByStars(product)
      )
    );
  }, [location.search]);

  return (
    <>
<div
        onClick={() => setShowFilters(false)}
        className={`${styles.shadow} ${
          showFilters ? styles.show_shadow : styles.hide_shadow
        }`}
      ></div>

    <div className={styles.container}>
      <section  className={`${styles.search_filter_sidenav} ${showFilters ? styles.show : styles.hide }`}
      >
        <div className={styles.options_container} onClick={()=> setShowFilters(false)}>
          <div className={styles.div_style} style={{ marginTop: "0px" }}>
            <h4>Customer reviews</h4>

            <div style={{ marginTop: "3px" }} className={styles.dd}>
              {" "}
              <Link
                to={formatURL(
                  `/search?query=${query}&&min-star=${5}&&max-star=${5}`
                )}
                className={styles.stars}
              >
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </Link>
              <Link
                className={styles.stars}
                to={formatURL(
                  `/search?query=${query}&&min-star=${4}&&max-star=${5}`
                )}
              >
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <span> & above</span>
              </Link>
              <Link
                className={styles.stars}
                to={formatURL(
                  `/search?query=${query}&&min-star=${3}&&max-star=${5}`
                )}
              >
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <span> & above</span>
              </Link>
              <Link
                className={styles.stars}
                to={formatURL(
                  `/search?query=${query}&&min-star=${2}&&max-star=${5}`
                )}
              >
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <span> & above</span>
              </Link>
              <Link
                className={styles.stars}
                to={formatURL(
                  `/search?query=${query}&&min-star=${1}&&max-star=${5}`
                )}
              >
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />

                <AiOutlineStar />
                <AiOutlineStar />
                <span> & above</span>
              </Link>
            </div>
          </div>

          <div className={styles.div_style}>
            <h4>Price</h4>
            <Link
              to={formatURL(
                `/search?query=${query}&&min-price=${0}&&max-price=${1000}`
              )}
            >
              <p>Under ₹1000</p>
            </Link>
            <Link
              to={formatURL(
                `/search?query=${query}&&min-price=${1000}&&max-price=${1500}`
              )}
            >
              {" "}
              <p>₹1000 - ₹1500</p>
            </Link>
            <Link
              to={formatURL(
                `/search?query=${query}&&min-price=${1500}&&max-price=${2000}`
              )}
            >
              <p>₹1500 - ₹2000</p>
            </Link>
            <Link
              to={formatURL(
                `/search?query=${query}&&min-price=${2000}&&max-price=${2500}`
              )}
            >
              <p>₹2000 - ₹2500</p>
            </Link>
            <Link
              to={formatURL(
                `/search?query=${query}&&min-price=${2500}&&max-price=${1000000000}`
              )}
            >
              {" "}
              <p>₹2500 & above </p>
            </Link>
          </div>

          <div className={styles.div_style}>
            <h4>Shop by Category</h4>

            <Link to={formatURL("/search?query=headphones")}>
              <p>Headphones</p>
            </Link>
            <Link to={formatURL("/search?query=earbuds")}>
              {" "}
              <p>Earbuds</p>
            </Link>
            <Link to={formatURL("/search?query=speakers")}>
              <p>Speakers</p>
            </Link>
            <Link to={formatURL("/search?query=smartwatches")}>
              <p>Smart Watches</p>
            </Link>
            <Link to={formatURL("/search?query=earphones")}>
              {" "}
              <p>Earphones</p>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <h2>
          Showing results for <span>{query}</span>
        </h2>
        <button className={styles.filters_btn} onClick={()=> setShowFilters(true)}><IoFilterSharp/> Apply Filters</button>
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
      </section>
    </div>

    </>
  );
};

export default SearchResults;
