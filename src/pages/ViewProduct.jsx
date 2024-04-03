import React, { useEffect } from "react";
import styles from "../styles/ViewProduct.module.css";
import { useParams } from "react-router-dom";
import mergedArray from "../utils/mergeJsonArray";

const ViewProduct = () => {
  const { name, type } = useParams();
  let data;

  // searching the requested product
  useEffect(() => {
    const modifiedName = name.toLowerCase().replace(/-/g, " ");
    data = mergedArray.filter((product) => {
      const modifiedProductName = product.name.toLowerCase();
      console.log(modifiedName, modifiedProductName);
      return (
        product.type.toLowerCase() === type &&
        modifiedProductName === modifiedName
      );
    });
    console.log(data);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.product_image_container}></section>

      <section className={styles.product_details_container}></section>
    </div>
  );
};

export default ViewProduct;
