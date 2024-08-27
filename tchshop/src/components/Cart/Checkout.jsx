import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import {
  getShipping,
  proceed,
  addShippingDetails,
  useCoupon,
  getShippingAddress
} from "../../services/userApi";

const dummyShippingMethods = [
  { id: 1, name: "Standard Shipping", deliveryTime: "5-7 days", cost: 5.99 },
  { id: 2, name: "Express Shipping", deliveryTime: "2-3 days", cost: 12.99 },
  { id: 3, name: "Overnight Shipping", deliveryTime: "1 day", cost: 24.99 }
];

const Checkout = () => {
  const [email, setEmail] = useState("");
  const cartItems = useSelector(state => state.cart.cart_details);
  const [deliveryForm, setDeliveryForm] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    zipcode: ""
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [checkoutRes, setCheckoutRes] = useState([]);
  const couponRef = useRef();

  useEffect(() => {
    const fetchShipping = async () => {
      const shipReq = await getShipping();
      setShippingMethods(shipReq);
    };

    fetchShipping();
  }, []);

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const { data, error } = await getShippingAddress();
      console.log("Data", data, "err: ", error);
      if (data.error) {
        setShippingAddress(null);
      } else {
        setShippingAddress(data);
      }
    };

    fetchShippingAddress();
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      const fetchCheckout = async () => {
        try {
          const { data, error } = await proceed(); // Call the checkout function
          setCheckoutRes(data); // Set the response to state
        } catch (error) {
          console.error("Error fetching checkout data:", error);
        }
      };
  
      fetchCheckout(); // Call the fetch function
    }
  }, []);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      const countryData = response.data.map(country => ({
        name: country.name.common,
        code: country.cca2
      }));

      // Sort the country data alphabetically by name
      const sortedCountries = countryData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCountries(sortedCountries);
    });
  }, []);

  useEffect(() => {
    if (deliveryForm.country) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: deliveryForm.country
        })
        .then(response => {
          setStates(response.data.data.states);
          setCities([]); // Reset cities when country changes
        });
    }
  }, [deliveryForm.country]);

  useEffect(() => {
    if (deliveryForm.state) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: deliveryForm.country,
          state: deliveryForm.state
        })
        .then(response => {
          setCities(response.data.data);
        });
    }
  }, [deliveryForm.state]);

  const handleChange = e => {
    const { name, value } = e.target;
    setDeliveryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDelivery = async () => {
    try {
      const result = await addShippingDetails(
        deliveryForm.country,
        deliveryForm.state,
        deliveryForm.city,
        deliveryForm.street,
        deliveryForm.zipcode
      );
      console.log("Shipping details added successfully:", result);
      setDeliveryForm({
        country: "",
        state: "",
        city: "",
        street: "",
        zipcode: ""
      });
    } catch (error) {
      console.error("Failed to add shipping details:", error);
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!email || !validateEmail(email))
      formErrors.email = "Valid email is required";
    if (!deliveryForm.firstName)
      formErrors.firstName = "First name is required";
    if (!deliveryForm.lastName) formErrors.lastName = "Last name is required";
    if (!deliveryForm.address) formErrors.address = "Address is required";
    if (!deliveryForm.country) formErrors.country = "Country is required";
    if (!deliveryForm.state) formErrors.state = "State is required";
    if (!deliveryForm.city) formErrors.city = "City is required";
    if (!deliveryForm.zipCode || !/^\d{3,6}$/.test(deliveryForm.zipCode))
      formErrors.zipCode = "Valid zip code is required (3-6 digits)";
    // if (!deliveryForm.phone) formErrors.phone = "Phone number is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const isDeliveryFormComplete = Object.values(deliveryForm).every(
    field => field && field.trim() !== ""
  );
  const subtotal = checkoutRes.total_price || 0;
  const shippingCost = selectedShippingMethod
    ? shippingMethods.find(method => method.id === selectedShippingMethod)?.cost
    : 0;
  const total = checkoutRes.total_price + checkoutRes.total_shipping;
  // const total = subtotal + shippingCost;

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log("Form submitted", {
        email,
        deliveryForm,
        selectedShippingMethod
      });
    }
  };

  const handleCoupon = async () => {
    const code = couponRef.current.value;
    console.log("coupon", code);
    const data = await useCoupon(code);
    console.log(data);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-black">
        Checkout
      </h1>

      {/* Contact Section */}
      <section className="mb-8">
        <legend className="mb-2 text-xl font-semibold">Contact</legend>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </section>

      {/* Delivery Section */}
      {!shippingAddress && (
        <section className="mb-8">
          <legend className="mb-2 text-xl font-semibold">Delivery</legend>

          <select
            name="country"
            value={deliveryForm.country}
            onChange={handleChange}
            className="w-full p-2 mb-2 border"
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500">{errors.country}</p>}

          <select
            name="state"
            value={deliveryForm.state}
            onChange={handleChange}
            className="w-full p-2 mb-2 border"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500">{errors.state}</p>}

          <select
            name="city"
            value={deliveryForm.city}
            onChange={handleChange}
            className="w-full p-2 mb-2 border"
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500">{errors.city}</p>}

          <div className="mb-2">
            <input
              name="street"
              type="text"
              placeholder="Street Address"
              value={deliveryForm.street}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            {errors.street && <p className="text-red-500">{errors.street}</p>}
          </div>

          <div className="mb-2">
            <input
              name="zipcode"
              type="text"
              placeholder="Zip Code"
              value={deliveryForm.zipcode}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            {errors.zipcode && <p className="text-red-500">{errors.zipcode}</p>}
          </div>

          <button
            type="button"
            onClick={handleDelivery}
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </section>
      )}
      {/* Shipping Method Section
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

      {/* Order Summary Section */}
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
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span>${checkoutRes.total_price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Shipping:</span>
              <span>{checkoutRes.total_shipping}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Tax:</span>
              <span>${checkoutRes.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Total:</span>
              <span>${checkoutRes.grand_total.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Discount Code"
                  ref={couponRef}
                  className="w-full p-2 mb-2 border"
                />
                <button
                  onClick={handleCoupon}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Pay Now Button */}
      <div className="mt-8 text-center">
        <a
          href="/payment"
          className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Pay Now
        </a>
      </div>
    </div>
  );
};

export default Checkout;
