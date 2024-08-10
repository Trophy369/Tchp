import React from 'react'

const ShopPolicy = () => {
  return (
    <section
    className=''
    >
        <div
    className=' h-[12vh] mx-auto  bg-indigo-300/50 mt-2 mb-24 py-2  flex flex-col '
    >
        <h1 className='text-center font-semibold '>Shop Policies</h1>
        <ul
            className='flex flex-row justify-around my-1 mx-2 items-center content-center'
        >
            <li
                className='rounded-full border-solid border-2 border-stone-950 py-1 px-4 '
            ><a
                href='/shoppolicy/shipping'
            >Shipping</a></li>

            <li
                 className='rounded-full border-solid border-2 border-stone-950 py-1 px-4 '
            ><a
                 href='/shoppolicy/returns'
            >Returns</a></li>

            <li
                 className='rounded-full border-solid border-2 border-stone-950 py-1 px-4 '
            ><a
                 href='/shoppolicy/warranty'
            >Warranty</a></li>
        </ul>
    </div>
    </section>
  )
}

export default ShopPolicy