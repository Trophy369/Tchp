{/* Delivery Section */}
{!shippingAddress &&

    //   <section className="mb-8">
    //     <legend className="mb-2 text-xl font-semibold">Delivery</legend>

    //     <select
    //       name="country"
    //       value={deliveryForm.country}
    //       onChange={handleChange}
    //       className="w-full p-2 mb-2 border"
    //     >
    //       <option value="">Select Country</option>
    //       {countries.map(country => (
    //         <option key={country.code} value={country.name}>
    //           {country.name}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.country && <p className="text-red-500">{errors.country}</p>}

    //     <select
    //       name="state"
    //       value={deliveryForm.state}
    //       onChange={handleChange}
    //       className="w-full p-2 mb-2 border"
    //     >
    //       <option value="">Select State</option>
    //       {states.map(state => (
    //         <option key={state.name} value={state.name}>
    //           {state.name}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.state && <p className="text-red-500">{errors.state}</p>}

    //     <select
    //       name="city"
    //       value={deliveryForm.city}
    //       onChange={handleChange}
    //       className="w-full p-2 mb-2 border"
    //     >
    //       <option value="">Select City</option>
    //       {cities.map(city => (
    //         <option key={city} value={city}>
    //           {city}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.city && <p className="text-red-500">{errors.city}</p>}

    //     <div className="mb-2">
    //       <input
    //         name="street"
    //         type="text"
    //         placeholder="Street Address"
    //         value={deliveryForm.street}
    //         onChange={handleChange}
    //         className="w-full p-2 border"
    //       />
    //       {errors.street && <p className="text-red-500">{errors.street}</p>}
    //     </div>

    //     <div className="mb-2">
    //       <input
    //         name="zipcode"
    //         type="text"
    //         placeholder="Zip Code"
    //         value={deliveryForm.zipcode}
    //         onChange={handleChange}
    //         className="w-full p-2 border"
    //       />
    //       {errors.zipcode && <p className="text-red-500">{errors.zipcode}</p>}
    //     </div>

    //     <button
    //       type="button"
    //       onClick={handleDelivery}
    //       className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
    //     >
    //       Submit
    //     </button>
    //   </section>
    // )}
    /* Shipping Method Section
    <section className="p-4 mb-8 border-2 border-black bg-light-brown-500/50">
      <h2 className="mb-2 text-xl font-semibold">Shipping Method</h2>
      {!isDeliveryFormComplete ? (
        <div className="p-4 bg-ash-200">
          Enter your shipping address to view available shipping methods
        </div>
      ) : (
        <div className="space-y-4">
          {shippingMethods.map(ship => (
            <label key={ship.method} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedShippingMethod === ship.method}
                onChange={() => setSelectedShippingMethod(ship.method)}
                className="mr-2 text-black form-checkbox border-ash-300"
              />
              <div>
                <span className="font-semibold">{ship.name}</span>
                <div className="text-sm text-gray-600">
                  Delivery Time: {ship.deliveryTime}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
          </section> */}


          <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
        <div className="p-4 border">
          {cartItems.map(cartP => (
            <div key={cartP.id}>
              <div className="flex space-x-4">
                <div className="relative">
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt="Product"
                    className="object-cover w-15 h-15"
                  />
                  <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    1
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-lg font-semibold">
                    {cartP.product_name}
                  </div>
                  <div className="text-lg font-semibold">
                    ${cartP.discounted_price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal:</span>
            <span>
              $
              {proceedRes?.total_price
                ? proceedRes.total_price.toFixed(2)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Shipping:</span>
            <span>{proceedRes?.total_shipping || "N/A"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Tax:</span>
            <span>${proceedRes?.tax ? proceedRes.tax.toFixed(2) : "0.00"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Total:</span>
            <span>
              $
              {proceedRes?.grand_total
                ? proceedRes.grand_total.toFixed(2)
                : "0.00"}
            </span>
          </div>
        </div>
      </section>