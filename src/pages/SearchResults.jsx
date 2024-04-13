import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoFilterSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ProductBox from "../components/ProductBox";
import { AppContext } from "../context/Context";
import styles from "../styles/SearchResult.module.css";
import formatURL from "../utils/formatURL";
import mergedArray from "../utils/mergeJsonArray";
import Button from "../components/Button";
import { BsEmojiFrownFill } from "react-icons/bs";
import convertToLowerCase from "../utils/convertToLowerCase";
import textFormatter from "../utils/textFormatter";




const SearchResults = () => {

  const navigate = useNavigate()
  const [star, setStar] = useState({ minStar: null, maxStar: null })
  const [price, setPrice] = useState({ minPrice: null, maxPrice: null })
  const [category, setCategory] = useState("")

  const { setShowFilters, showFilters } = useContext(AppContext)
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get("query");
  const maxPriceQuery = q.get("max-price");
  const minPriceQuery = q.get("min-price");
  const maxStarQuery = q.get("max-star");
  const minStarQuery = q.get("min-star");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPrice({ minPrice: minPriceQuery, maxPrice: maxPriceQuery })
    setStar({ minStar: minStarQuery, maxStar: maxStarQuery })
    setCategory(query)
  }, [location.search])

  const handleNavigation = () => {
    const url = new URL(window.location.href);
    const newUrl = formatURL(
      `${url.pathname}?query=${category ? category : query}${price.minPrice && price.maxPrice ? `&&min-price=${price.minPrice}&&max-price=${price.maxPrice}` : ""}${star.minStar && star.maxStar ? `&&min-star=${star.minStar}&&max-star=${star.maxStar}` : ""}`
    );

    navigate(newUrl)
  }


  useEffect(() => {
    setLoading(true)
    const priceCheck = minPriceQuery && maxPriceQuery
    const starCheck = minStarQuery && maxStarQuery
   

    const filterByPrice = (product) => {
    const r = !priceCheck || (product.price > minPriceQuery && product.price < maxPriceQuery);
    console.log(r)
    return r
    };
    const filterByStars = (product) => {
      return (
        !starCheck ||
        (minStarQuery == 5
          ? product.reviewStars == 5
          : product.reviewStars > minStarQuery && product.reviewStars < maxStarQuery)
      );
    };
    const filterByQuery = (product) => {
      return query === "all" || convertToLowerCase(product.type).includes(convertToLowerCase(query)) || convertToLowerCase(product.name).includes(convertToLowerCase(query)) ||  convertToLowerCase(product.description).includes(convertToLowerCase(query))
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
      setLoading(false)
      console.log("loading is completed")
    }, 200)
  }, [location.search]);
  

  


  return (
    <>
      <div
        onClick={() => setShowFilters(false)}
        className={`${styles.shadow} ${showFilters ? styles.show_shadow : styles.hide_shadow
          }`}
      ></div>

      <div className={styles.container}>
        <section className={`${styles.search_filter_sidenav} ${showFilters ? styles.show : styles.hide}`}
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
                  <input type="radio" name="star" checked={star.minStar == 5 ? true : false} />
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
                  <input type="radio" name="star" checked={star.minStar == 4 ? true : false}  />

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
                  <input type="radio" name="star" checked={star.minStar == 3 ? true : false}  />

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
                  <input type="radio" name="star" checked={star.minStar == 2 ? true : false}  />

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
                  <input type="radio" name="star" checked={star.minStar == 1 ? true : false}  />

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
                <input type="radio" name="price" checked={price.minPrice == 100 ? true : false} />
                <p>Under ₹1000</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 1000, maxPrice: 1500 })}

              >
                <input type="radio" name="price" checked={price.minPrice == 1000 ? true : false} />
                {" "}
                <p>₹1000 - ₹1500</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 1500, maxPrice: 2000 })}
              >
                <input type="radio" name="price" checked={price.minPrice == 1500 ? true : false} />
                <p>₹1500 - ₹2000</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 2000, maxPrice: 2500 })}

              >
                <input type="radio" name="price" checked={price.minPrice == 2000 ? true : false} />
                <p>₹2000 - ₹2500</p>
              </label>
              <label
                onClick={() => setPrice({ minPrice: 2500, maxPrice: 100000000 })}

              >
                <input type="radio" name="price" checked={price.minPrice == 2500 ? true : false} />
                {" "}
                <p>₹2500 & above </p>
              </label>
            </div>

            <div className={styles.div_style}>
              <h4>Shop by Category</h4>

              <label onClick={() => setCategory("headphones")} >
                <input type="radio" name="category" checked={category.includes("headphones") ? true : false} />
                <p>Headphones</p>
              </label>
              <label onClick={() => setCategory("earbuds")} >
                <input type="radio" name="category" checked={category.includes("earbuds") ? true : false} />
                {" "}
                <p>Earbuds</p>
              </label>
              <label onClick={() => setCategory("speakers")} >
                <input type="radio" name="category" checked={category.includes("speakers") ? true : false} />
                <p>Speakers</p>
              </label>
              <label onClick={() => setCategory("smartwatches")}>
                <input type="radio" name="category" checked={category.includes("smartwatches") == query ? true : false} />
                <p>Smart Watches</p>
              </label>
              <label onClick={() => setCategory("earphones")}>
                <input type="radio" name="category" checked={category.includes("earphones") ? true : false} />
                {" "}
                <p>Earphones</p>
              </label>
            </div>


          </div>

          <div className={styles.btn_container}>
            <Button onClick={()=> {navigate(`/search?query=${query}`);setPrice({minPrice:null,maxPrice:null});setStar({minStar:null,maxStar:null})}}text={"Clear"} padding="14px" fontWeight="600" fontSize="0.8rem" color="var(--primary-color)" borderRadius="10px" background="var(--mid-dark-background)" width="100%" />

            <Button onClick={handleNavigation}   text={"Apply"} padding="14px" fontWeight="600" fontSize="0.8rem" color="var(--primary-color)" borderRadius="10px" background="var(--secondary-background)" width="100%" />
          </div>

        </section>

        <section className={styles.results}>
          <h2>
            Showing results for <span>{textFormatter(query)}</span>
          </h2>
        {data.length == 0 && !loading ? null :   <button className={styles.filters_btn} onClick={() => setShowFilters(true)}><IoFilterSharp /> Apply Filters</button>}


{data.length == 0 && !loading ? 
            <div className={styles.no_result}>
            <BsEmojiFrownFill />
              <h5>No Result Found</h5>
              <p>Sorry, we unable to find the results, please re-check the word's spelling you have entered.</p>
            </div> : 
          <div className={styles.grid_container}>
            { loading ?
              <>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
                <div className={styles.loaders}></div>
              </>
              : data.map((product, index) => {
                return (
                  <ProductBox
                    changePermit={false}
                    key={index}
                    product={product}
                    productIndex={index}
                  />
                );
              })}
          </div> }
        </section>
      </div>

    </>
  );
};

export default SearchResults;
