import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

export const getUser = async () => {
  const requestOptions = {
    method: "GET",
    mode: 'no-cors',
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };

  const response = await fetch(`${baseUrl}/@me`, requestOptions);
  return response.json();
};

export const listproducts = async () => {
  const response = await fetch(`${baseUrl}/listproducts`, {
    credentials: "include",
  });
  return response.json();
};

// export const listproducts = async () => {
//   const response = await axios.get(`${baseUrl}/listproducts`, {
//     withCredentials: true,
//   });
//   return response.data;
// };

// export const signin = async (email, password) => {
//   try {
//     const response = await axios.post(
//       `${baseUrl}/auth/signin`,
//       { email, password },
//       { withCredentials: true }
//     );
//     // // console.log(response.data.data);
//     // if (response.ok) {
//     //   console.log('i did')
//     return response.data.data;
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const signin = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };

  const response = await fetch(`${baseUrl}/auth/signin`, requestOptions);
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((data) => {
      let errorMsg = "Auth Failed";
      console.log(data.error);
      alert(errorMsg);
      throw new Error(errorMsg);
    });
  }
};

// export const loggedUser = () => {
//   if (localStorage.getItem("user")) {
//     return JSON.parse(localStorage.getItem("user"));
//   }
// };

export const signup = async (email, password, remember) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, remember }),
    credentials: "include"
  };

  const response = await fetch(`${baseUrl}/auth/signup`, requestOptions);
  return response;
};

export const signout = async (next) => {
  const response = await fetch(`${baseUrl}/auth/logout`, {credentials: "include"});
  next();
  return response;

  // if (typeof window !== "undefined") {
  //   localStorage.removeItem("loggedUser");
  //   axios.get(`${baseUrl}/signout`);
  //   next();
  // }
};
