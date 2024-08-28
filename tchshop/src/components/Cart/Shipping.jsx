import { useState, useEffect } from "react";
import {
    getShipping,
    addShippingDetails,
  } from "../../services/userApi";
import axios from "axios";


const Shipping = () => {
  const [email, setEmail] = useState("");
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
  const [errors, setErrors] = useState({});

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

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const isDeliveryFormComplete = Object.values(deliveryForm).every(
    field => field && field.trim() !== ""
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setDeliveryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDelivery = async () => {
    try {
      if (validateForm()) {
        const result = await addShippingDetails(
          deliveryForm.country,
          deliveryForm.state,
          deliveryForm.city,
          deliveryForm.street,
          deliveryForm.zipcode
        );
        console.log("Shipping details added successfully:", result);
      }
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

  return (
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
  );
};

export default Shipping;
