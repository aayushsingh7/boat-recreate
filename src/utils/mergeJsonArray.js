import searchResults from '../json/searchResults.json'
// import dailyDeals from '../json/dailyDeals.json'
import newLaunches from '../json/newLaunches.json'

const mergedArray = [
  ...searchResults,
  ...newLaunches
]

export default mergedArray;