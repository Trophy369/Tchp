import {useState} from "react"
import Hero from '../Home/Hero'
import Products from '../Products/Products'
// import ShopPolicy from '../Home/ShopPolicy'
import Search from '../Home/Search'


const HomePage = () => {
  const [searchResult, setSearchResult] = useState([])

  return (
    <>
        <Hero />
        <Search setSearchResult={setSearchResult} />
        <Products searchResult={searchResult} />
        {/* <ShopPolicy /> */}
    </>
  )
}

export default HomePage