import {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { search } from '../../services/userApi';


const Search = ({setSearchResult, setLoading}) => {
  const searchRef = useRef()

  const handleSearch = async () => {
    setLoading(true)
    const q = searchRef.current.value;

    const {data} = await search(q)
    setSearchResult(data)
    setLoading(false)
  }

  return (
    <section className="mx-auto w-[80vw] md:w-[50vw] py-4">
      <div className="flex items-center p-2 border border-gray-300 rounded-md shadow-sm">
        <input
          type="text"
          ref={searchRef}
          placeholder="What are you looking for?"
          className="w-full h-10 py-2 pl-4 pr-2 text-gray-700 outline-none"
        />
        <button onClick={handleSearch} className="h-10 p-2 ml-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </section>
  );
  
  
};

export default Search;
