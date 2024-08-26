import config from "../config";
import { fetchWithState } from "./userApi";

const baseUrl = config.baseUrl;

export const getUser = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  };

  const response = await fetch(`${baseUrl}/auth/@me`, requestOptions);
  return response.json();
};

export const listproducts = async () => {
  const response = await fetch(`${baseUrl}/listproducts`, {
    credentials: "include"
  });
  return response.json();
};

export const signin = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/signin`, requestOptions)

  // const response = await fetch(`${baseUrl}/auth/signin`, requestOptions);
  // if (response.ok) {
  //   return response.json();
  // } else {
  //   return response.json().then(data => {
  //     let errorMsg = "Auth Failed";
  //     console.log(data.error);
  //     alert(errorMsg);
  //     throw new Error(errorMsg);
  //   });
  // }
};

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

export const signout = async next => {
  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST", // Assuming logout requires a POST method
      credentials: "include" // Include credentials to ensure session cookies are sent
    });

    if (response.ok) {
      // If the response is successful, call the next function
      next();

      // Optionally clear client-side user data
      localStorage.removeItem("user"); // Clear stored user data (if any)

      return response;
    } else {
      // Handle cases where logout is unsuccessful
      const errorData = await response.json(); // Optional: get the response body for error details
      console.error(
        "Logout failed:",
        response.status,
        response.statusText,
        errorData
      );
      return response;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    throw error; // Re-throw the error after logging
  }
};
