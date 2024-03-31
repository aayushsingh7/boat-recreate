import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/MobileSearchPage.module.css";
import { AppContext } from "../context/Context";
import { AiOutlineArrowLeft } from "react-icons/ai";
import categories from '../json/categories.json'
import {useNavigate} from "react-router-dom"

const MobileSearchPage = () => {

  const { openSearchPage, setOpenSearchPage } = useContext(AppContext);
  
  const [query,setQuery] = useState("")
  const q = new URLSearchParams(location.search);
  const getSearchRequestText = q.get('query')
  const navigate = useNavigate()

  console.log(location.search)

  useEffect(()=> {
    if(openSearchPage){
       document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
    }
      },[openSearchPage])

      useEffect(()=> {
        setQuery(getSearchRequestText)
      },[location.search])
    
      const searchQueryOnType = (e)=> {
        if(e.key === "Enter" || e.which === 13){
       
          setOpenSearchPage(false)
          navigate(`/search?query=${query}`)
       }
       if(query.length === 0){
      navigate("/")
       }
      }


      
  return (
    <>
      <div onClick={()=> setOpenSearchPage(false)} className={`${styles.shadow} ${openSearchPage ? styles.show_shadow : styles.hide_shadow}`}></div>
    <div
      className={`${styles.container} ${
        openSearchPage ? styles.show : styles.hide
      }`}
    >
      <div className={styles.part_one}>
          <AiOutlineArrowLeft className={styles.return} onClick={()=> setOpenSearchPage(false)} />
          <input type="text"  placeholder="Search headphones, earphones, etc" onKeyDown={searchQueryOnType} value={query} onChange={(e)=> setQuery(e.target.value)}  autoFocus/>
      </div>

      <div className={styles.suggested_container}>
      <h2>Search by category</h2>
     Wireless Earbuds
     Wireless Earbuds
     
     
      <div
        className={styles.category_box_container}
      >
        {categories.map((product) => (
          <div key={product.id} className={styles.category_box} onClick={()=> {navigate(`/search?query=${product.title}`);setOpenSearchPage(false)}}>
            <span className={styles.bg_circle}></span>
            <img src={product.image} alt={product.title} />
            <p className={styles.title}>{product.title}</p>
          </div>
        ))}
      </div>

      </div>
    </div>
    </>
  );
};

export default MobileSearchPage;
