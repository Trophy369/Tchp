import React from 'react'

const Product = ({ children }) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      { children }
      </div>
  )
}

export default Product