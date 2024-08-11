const baseUrl = "http://127.0.0.1:5000";

export const getCategory = async (category_id) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  const response = await fetch(
    `${baseUrl}/admin/category/${category_id}`,
    requestOptions
  );
  return response.json();
};

export const getShipping = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  const response = await fetch(
    `${baseUrl}/admin/shipping`,
    requestOptions
  );
  return response.json();
};

export const createCategory = async (category_name) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category_name }),
    credentials: "include",
  };

  const response = await fetch(
    `${baseUrl}/admin/create_category`,
    requestOptions
  );
  return response.json();
};

export const createproduct = async (
  product_name,
  description,
  quantity,
  regular_price,
  discounted_price
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_name,
      description,
      quantity,
      regular_price,
      discounted_price,
    }),
    credentials: "include"
  };

  const response = await fetch(`${baseUrl}/admin/addproduct`, requestOptions);
  return response.json();
};

export const createReview = async (formData) => {
  const extractedId = formData.get('id')
  const requestOptions = {
    method: "POST",
    body: formData, 
    credentials: "include"
  };

  try {
    const response = await fetch(`${baseUrl}/admin/addReview/${extractedId}`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// export const createReview = async (id) => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(name),
//     credentials: "include"
//   };

//   const response = await fetch(`${baseUrl}/admin/addReview/${id}`, requestOptions);
//   return response.json();
// };

export const createRole = async (name) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
    credentials: "include"
  };

  const response = await fetch(`${baseUrl}/admin/create_role`, requestOptions);
  return response.json();
};

export const createShipping = async (cost, method, method_description) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cost, method, method_description }),
    credentials: "include",
  };

  const response = await fetch(
    `${baseUrl}/admin/addShipping`,
    requestOptions
  );
  return response.json();
};

export const assignRole = async (email, role_to_assign) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, role_to_assign }),
    credentials: "include"
  };

  const response = await fetch(`${baseUrl}/admin/assign_role`, requestOptions);
  return response.json();
};

export const assignCategory = async (product_name, category_to_assign) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_name,
      category_to_assign,
    }),
    credentials: "include"
  };

  const response = await fetch(
    `${baseUrl}/admin/assign_category`,
    requestOptions
  );
  return response.json();
};

export const deleteCategory = async (id) => {
  const requestOptions = {
    method: "DELETE",
    credentials: "include"
  };

  const response = await fetch(
    `${baseUrl}/admin/delete_category/${id}`,
    requestOptions
  );
  return response.json();
};

export const deleteProduct = async (id) => {
  const requestOptions = {
    method: "DELETE",
    credentials: "include"
  };

  const response = await fetch(
    `${baseUrl}/admin/delete_product/${id}`,
    requestOptions
  );
  return response.json();
};

export const deleteRole = async (id) => {
  const requestOptions = {
    method: "DELETE",
    credentials: "include"
  };

  const response = await fetch(
    `${baseUrl}/admin/delete_role/${id}`,
    requestOptions
  );
  return response.json();
};

export const deleteShipping = async (method) => {
  const requestOptions = {
    method: "DELETE",
    credentials: "include"
  };

  const response = await fetch(
    `${baseUrl}/admin/delete_shipping/${method}`,
    requestOptions
  );
  return response.json();
};