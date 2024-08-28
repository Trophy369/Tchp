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

  return fetchWithState(`${baseUrl}/auth/signup`, requestOptions)
};

export const forgotPassword = async (email) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/reset_password_email`, requestOptions)
};

export const verifyCode = async (code) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    credentials: "include",
  };

  return fetchWithState(`${baseUrl}/auth/confirm_vcode`, requestOptions)
};

export const resetPassword = async (password, confirm) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, confirm }), // Include both password and confirm in the request body
    credentials: "include" // Include cookies for session handling
  };

  return fetchWithState(`${baseUrl}/auth/reset_password`, requestOptions)
};

export const signout = async () => {
  const requestOptions = {
    method: "GET",
    credentials: "include" 
  };
  return fetchWithState(`${baseUrl}/auth/logout`, requestOptions);
};


