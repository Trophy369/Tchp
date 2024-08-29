import config from '../config';

const baseUrl = config.baseUrl;

export const fetchWithState = async (url, options) => {
  const loadingState = { loading: true, error: null, data: null };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok && data.message === 'Empty Cart!') {
      const errorMessage = data.message || "An error occurred";
      throw new Error(errorMessage);
    }

    // Return the success state
    return { ...loadingState, loading: false, data };
  } catch (error) {
    console.error("Error:", error.message);
    return { ...loadingState, loading: false, error: error.message };
  }
};

export const addToCart = async (id, quantity, shipping, color) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity, shipping, color }),
    credentials: 'include',
  };
  
  return fetchWithState(`${baseUrl}/addToCart/${id}`, requestOptions)
  // try {
  //   const response = await fetch(`${baseUrl}/addToCart/${id}`, requestOptions);
  //   const result = await response.json();

  //   if (!response.ok) {
  //     throw new Error(result.message || "Failed to add to cart");
  //   }

  //   console.log("Product added to cart successfully:", result.Message);
  //   return result;
  // } catch (error) {
  //   console.error("Error:", error.message);
  //   throw error;
  // }
};

export const useCoupon = async (code) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    credentials: 'include',
  };
  
  try {
    const response = await fetch(`${baseUrl}/useCoupon`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};


export const addShippingDetails = async (country, state, city, street, zipcode) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country, state, city, street, zipcode }),
    credentials: 'include',
  };
  
  try {
    const response = await fetch(`${baseUrl}/shippingAddress`, requestOptions);
    const result = await response.json();
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

export const viewCategory = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/categories`, requestOptions)
}

export const viewCategoryProducts = async (category) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/products/${category}`, requestOptions)
}

export const viewProductDescription = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/product_desc/${id}`, requestOptions)
};

export const viewProductColors = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/view_product_color/${id}`, requestOptions)
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

  return fetchWithState(`${baseUrl}/reviews/${id}`, requestOptions)
}

export const getCart = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/cart`, requestOptions)
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

export const getShippingAddress = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/shippingAddress`, requestOptions)
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

export const checkout = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/checkout`, requestOptions)
  try {
    const response = await fetch(`${baseUrl}/checkout`, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred during checkout.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

export const proceed = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/proceed`, requestOptions)

  try {
    const response = await fetch(`${baseUrl}/proceed`, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred during checkout.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};


export const payment = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/paymentMethods`, requestOptions)
};

export const pay = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/pay`, requestOptions)
};

export const confirmation = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  };

  return fetchWithState(`${baseUrl}/pay`, requestOptions)
};