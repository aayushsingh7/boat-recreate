import React from "react";
import styles from "../styles/Product.module.css";
import CategorySlider from "../layouts/CategorySlider";
import ProductSlider from "../layouts/ProductSlider";
import newLaunches from "../json/newLaunches.json";
import bestSellerCategoriesVideos from "../json/bestSellerCategories.json";

const Products = () => {
  return (
    <div className={styles.container} id="products">
      <ProductSlider
        data={bestSellerCategoriesVideos}
        type={"video-slider"}
        tittle={"Explore"}
        highlight={"Best Sellers"}
      />

      <section>
        <h2>
          Shop by <span className={styles.under_line}>Categories</span>
        </h2>
        <CategorySlider />
      </section>

      <ProductSlider
        data={newLaunches}
        type={"product-slider"}
        tittle={"New"}
        highlight={"Launches"}
      />
    </div>
  );
};

export default Products;
