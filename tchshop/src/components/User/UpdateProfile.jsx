import { useState, useEffect } from "react";
import { getShippingAddress, addShippingDetails } from "../../services/userApi";
import axios from "axios";

const UpdateProfile = () => {
  const [deliveryForm, setDeliveryForm] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    zipcode: "",
    firstname: "",
    lastname: "",
    phone: ""
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [shipData, setShipData] = useState(false);

  console.log(shippingAddress);

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const { data, error } = await getShippingAddress();
      console.log(data);
      if (data.error) {
        setShippingAddress(null);
      } else {
        setShippingAddress(data.shipping_address);
        setShipData(true);
      }
    };

    fetchShippingAddress();
  }, []);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2
        }));

        // Sort countries alphabetically
        const sortedCountries = countryData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when the country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (deliveryForm.country) {
        try {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: deliveryForm.country }
          );
          setStates(response.data.data.states || []);
          setCities([]); // Reset cities when country changes
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      }
    };

    fetchStates();
  }, [deliveryForm.country]);

  // Fetch cities when the state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (deliveryForm.state) {
        try {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: deliveryForm.country,
              state: deliveryForm.state
            }
          );
          setCities(response.data.data || []);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      }
    };

    fetchCities();
  }, [deliveryForm.state]);

  // Validate form field
  const validateForm = () => {
    let formErrors = {};

    if (!deliveryForm.phone) formErrors.phone = "Phone is required";
    if (!deliveryForm.lastname) formErrors.street = "Lastname is required";
    if (!deliveryForm.firstname) formErrors.street = "Firstname is required";
    if (!deliveryForm.street) formErrors.street = "Street address is required";
    if (!deliveryForm.country) formErrors.country = "Country is required";
    if (!deliveryForm.state) formErrors.state = "State is required";
    if (!deliveryForm.city) formErrors.city = "City is required";
    if (!deliveryForm.zipcode || !/^\d{3,6}$/.test(deliveryForm.zipcode))
      formErrors.zipcode = "Valid zip code is required (3-6 digits)";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setDeliveryForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleDelivery = async () => {
    if (!validateForm()) {
      return; // Exit if form is not valid
    }

    setLoading(true);
    try {
      const result = await addShippingDetails(
        deliveryForm.country,
        deliveryForm.state,
        deliveryForm.city,
        deliveryForm.street,
        deliveryForm.zipcode,
        deliveryForm.firstname,
        deliveryForm.lastname,
        deliveryForm.phone
      );
      if (result.status === "success") {
        setShipData(true);
      }

      // Clear form after successful submission
      setDeliveryForm({
        country: "",
        state: "",
        city: "",
        street: "",
        zipcode: "",
        firstname: "",
        lastname: "",
        phone: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to add shipping details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg p-4 mx-auto bg-white rounded-md shadow-md mb-44 mt-11">
    <legend className="mb-4 text-xl font-bold text-center">Enter address where product will be delivered.</legend>
  
    <form>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={deliveryForm.country}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
        </div>
  
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={deliveryForm.state}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
        </div>
  
        {/* <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={deliveryForm.city}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
        </div> */}
      
      <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="street">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={deliveryForm.city}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
        </div>

      </div>
  
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="street">Street Address</label>
          <input
            id="street"
            type="text"
            name="street"
            value={deliveryForm.street}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
        </div>
  
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="zipcode">Zip Code</label>
          <input
            id="zipcode"
            type="number"
            name="zipcode"
            value={deliveryForm.zipcode}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.zipcode && <p className="mt-1 text-sm text-red-500">{errors.zipcode}</p>}
        </div>
      </div>
  
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            value={deliveryForm.lastname}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.lastname && <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>}
        </div>
  
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            value={deliveryForm.firstname}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.firstname && <p className="mt-1 text-sm text-red-500">{errors.firstname}</p>}
        </div>
      </div>
  
      <div>
        <label className="block mb-2 text-sm font-medium" htmlFor="phone">Phone Number</label>
        <input
    name="phone"
    type="tel"
     inputMode="numeric"
    pattern="($\d{3}$\s?|\d{3}-)?\d{3}-\d{4}"
    placeholder="(123) 456-7890"
    value={deliveryForm.phone}
    onChange={handleChange}
    className="w-full p-2 border"
  />
  {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>
  
      <div className="flex justify-center mt-4">
  <button
    type="button"
    onClick={handleDelivery}
    className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    disabled={loading}
  >
    {loading ? "Processing..." : "Submit"}
  </button>
</div>

    </form>
  </section>
  
  );
};

export default UpdateProfile;
