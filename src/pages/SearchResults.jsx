import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import styles from '../styles/SearchResult.module.css'
import searchResults from '../json/SearchResult.json'
import ProductBox from '../components/ProductBox'

const SearchResults = () => {

  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get('query')

  useEffect(()=> {
  window.scrollTo({top:0,behavior:"instant"})
  },[])

  return (
    <div className="add-padding-container">
    <div className={styles.container}>
      <h2>Showing results for <span>{query}</span></h2>

      <div className={styles.grid_container}>
 {
searchResults.map((product,index)=> {
  return (
    <ProductBox changePermit={false} key={index} product={product} productIndex={index}/>
  )
})
 }
      </div>


    </div>
    </div>
  )
}

export default SearchResults