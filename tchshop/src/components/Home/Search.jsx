import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  return (
    <section className='mx-auto w-[80vw] md:w-[50vw] py-2'>
        <div className="flex items-center p-1 border border-gray-500 rounded-md ">
            <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-1 outline-none "
            />
            <button className="p-2 ml-2 text-white bg-blue-500 rounded-md">
            <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    </section>
    
  );
};

export default Search;
