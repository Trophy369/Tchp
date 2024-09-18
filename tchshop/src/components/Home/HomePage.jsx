import {useState} from "react"
import Hero from '../Home/Hero'
import Products from '../Products/Products'
// import ShopPolicy from '../Home/ShopPolicy'
import Search from '../Home/Search'


const HomePage = () => {
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false);


  return (
    <>
        <Hero />
        <Search setSearchResult={setSearchResult} setLoading={setLoading} />
      <Products searchResult={searchResult} loading={loading} setLoading={setLoading} />
        {/* <ShopPolicy /> */}
    </>
  )
}

export default HomePage