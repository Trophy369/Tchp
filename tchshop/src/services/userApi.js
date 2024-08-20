import config from '../config';

const baseUrl = config.baseUrl;

export const addToCart = async (id, userId, quantity, shipping, color) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, quantity, shipping, color }),
    credentials: 'include',
  };
  
  try {
    const response = await fetch(`${baseUrl}/addToCart/${id}`, requestOptions);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add to cart");
    }

    console.log("Product added to cart successfully:", result.Message);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const viewProduct = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/product/${id}`, requestOptions);
  return response.json();
}

export const viewProductDescription = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/product_desc/${id}`, requestOptions);
  return response.json();
};

export const viewProductColors = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/view_product_color/${id}`, requestOptions);
  return response.json();
};

export const updateCartItemColor = async (productId, color) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ color }),  // sending the color in the request body
  };

  const response = await fetch(`${baseUrl}/updateColor/${productId}`, requestOptions);
  return response.json();
};

export const viewReview = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/reviews/${id}`, requestOptions);
  return response.json();
}

export const getCart = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/cart`, requestOptions);
  return response.json();
};

export const clearCart = async () => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/clearCart`, requestOptions);
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