import React from 'react'
import {useLocation} from 'react-router-dom'

const SearchResults = () => {

  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get('query')

  return (
    <div>SearchResults</div>
  )
}

export default SearchResults