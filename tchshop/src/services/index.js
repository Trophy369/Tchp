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

export const listproducts = async (limit, offset) => {
  const response = await fetch(
    `${baseUrl}/listproducts?limit=${limit}&offset=${offset}`,
    {
      credentials: "include"
    }
  );
  return response.json();
};

export const signin = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/signin`, requestOptions);
};

export const signup = async (email, password, remember) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, remember }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/signup`, requestOptions);
};

export const signup2 = async (email, password, coupon) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/signup/${coupon}`, requestOptions);
};

export const forgotPassword = async email => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/reset_password_email`, requestOptions);
};

export const verifyCode = async code => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    credentials: "include"
  };

  return fetchWithState(`${baseUrl}/auth/confirm_vcode`, requestOptions);
};

export const resetPassword = async (password, confirm) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, confirm }), // Include both password and confirm in the request body
    credentials: "include" // Include cookies for session handling
  };

  return fetchWithState(`${baseUrl}/auth/reset_password`, requestOptions);
};

export const signout = async () => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(`${baseUrl}/auth/logout`, requestOptions);
  return response
};
