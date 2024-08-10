import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { getShipping } from '../services/userApi';

const dummyShippingMethods = [
  { id: 1, name: "Standard Shipping", deliveryTime: "5-7 days", cost: 5.99 },
  { id: 2, name: "Express Shipping", deliveryTime: "2-3 days", cost: 12.99 },
  { id: 3, name: "Overnight Shipping", deliveryTime: "1 day", cost: 24.99 },
];

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [deliveryForm, setDeliveryForm] = useState({
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [errors, setErrors] = useState({});
  const [shippingMethods, setShippingMethods] = useState([])

  useEffect(() => {
    const fetchShipping = async () => {
      const shipReq = await getShipping()
      setShippingMethods(shipReq)
    }

    fetchShipping()
  }, [])

  useEffect(() => {
    // Fetch countries from a public API
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryData = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryData);
      });
  }, []);

  useEffect(() => {
    // Fetch states based on the selected country
    if (deliveryForm.country) {
      axios.post('https://countriesnow.space/api/v0.1/countries/states', { country: deliveryForm.country })
        .then(response => {
          setStates(response.data.data.states);
          setCities([]); // Reset cities when country changes
        });
    }
  }, [deliveryForm.country]);

  useEffect(() => {
    // Fetch cities based on the selected state
    if (deliveryForm.state) {
      axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: deliveryForm.country,
        state: deliveryForm.state,
      })
        .then(response => {
          setCities(response.data.data);
        });
    }
  }, [deliveryForm.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryForm({ ...deliveryForm, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!email || !validateEmail(email)) formErrors.email = "Valid email is required";
    if (!deliveryForm.firstName) formErrors.firstName = "First name is required";
    if (!deliveryForm.lastName) formErrors.lastName = "Last name is required";
    if (!deliveryForm.address) formErrors.address = "Address is required";
    if (!deliveryForm.country) formErrors.country = "Country is required";
    if (!deliveryForm.state) formErrors.state = "State is required";
    if (!deliveryForm.city) formErrors.city = "City is required";
    if (!deliveryForm.zipCode || !/^\d{3,6}$/.test(deliveryForm.zipCode)) formErrors.zipCode = "Valid zip code is required (3-6 digits)";
    if (!deliveryForm.phone) formErrors.phone = "Phone number is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const isDeliveryFormComplete = Object.values(deliveryForm).every(field => field && field.trim() !== '');
  const subtotal = 100; // Example subtotal
  const shippingCost = selectedShippingMethod ? shippingMethods.find(method => method.id === selectedShippingMethod)?.cost : 0;
  const total = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log("Form submitted", { email, deliveryForm, selectedShippingMethod });
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-black">Checkout</h1>

      {/* Contact Section */}
      <section className="mb-8">
        <legend className="mb-2 text-xl font-semibold">Contact</legend>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </section>

      {/* Delivery Section */}
      <section className="mb-8">
        <legend className="mb-2 text-xl font-semibold">Delivery</legend>
        <select
          name="country"
          value={deliveryForm.country}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>{country.name}</option>
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
          {states.map((state) => (
            <option key={state.name} value={state.name}>{state.name}</option>
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
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500">{errors.city}</p>}
        {["firstName", "lastName", "address", "zipCode"].map((key) => (
          <div key={key} className="mb-2">
            <input
              name={key}
              type="text"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={deliveryForm[key]}
              onChange={handleChange}
              className="w-full p-2 border"
            />
            {errors[key] && <p className="text-red-500">{errors[key]}</p>}
          </div>
        ))}
        <PhoneInput
          placeholder="Phone"
          type="phone"
          value={deliveryForm.phone}
          onChange={(value) => setDeliveryForm({ ...deliveryForm, phone: value })}
          className="w-full p-2 mb-2 border"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </section>

      {/* Shipping Method Section */}
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
                  <span className="font-semibold">{method.name}</span>
                  <div className="text-sm text-gray-600">Delivery Time: {method.deliveryTime}</div>
                </div>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Order Summary Section */}
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
        <div className="p-4 border">
          <div className="flex space-x-4">
            <div className="relative">
              <img src="https://via.placeholder.com/150" alt="Product" className="object-cover w-15 h-15" />
              <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">1</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="text-lg font-semibold">Product Name</div>
              <div className="text-lg font-semibold">$100.00</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Shipping:</span>
              <span>{isDeliveryFormComplete ? `$${shippingCost?.toFixed(2) || '0.00'}` : 'Enter shipping address'}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Discount Code" className="w-full p-2 mb-2 border" />
                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Apply</button>
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
