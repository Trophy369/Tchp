import axios from "axios"
import config from '../config';

const baseUrl = config.baseUrl;

export const addToCart = async (id, userId, quantity) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, quantity }),
    credentials: 'include',
  };
  
  const response = await fetch(`${baseUrl}/addToCart/${id}`, requestOptions);
  return response.json();
};

// export const getCart = async (userId) => {
//   const response = await axios.get(`${baseUrl}/cart/${userId}`, {withCredentials: true});
//   return response.data;
// };

export const viewProduct = async (product_name) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/product/${product_name}`, requestOptions);
  return response.json();
}

export const viewReview = async (product_name) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/reviews/${product_name}`, requestOptions);
  return response.json();
}

export const getCart = async (userId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/cart/${userId}`, requestOptions);
  return response.json();
};

export const removeFromCart = async (productId) => {  
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/removeFromCart/${productId}`, requestOptions);
  return response.json();
};

export const handleQuantity = async (productId, quantity) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({quantity}),
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/updateQuantity/${productId}`, requestOptions);
  return response.json();
};

export const inputQuantity = async (productId, input) => {
  const quantity = input;

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({quantity}),
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/updateQuantity/${productId}`, requestOptions);
  return response.json();
};

export const getShipping = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/shipping`, requestOptions);
  return response.json();
};

export const assignShipping = async (productId) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/assignShipping/${productId}`, requestOptions);
  return response.json();
};