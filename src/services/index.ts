import http from "./http";
import axios from "axios";
//----------------------------------
export const login = async (payload: any) => {
  const { data } = await http.post(`/auth/login`, payload);
  return data;
};
export const register = async (payload: any) => {
  const { data } = await http.post(`/auth/register`, payload);
  return data;
};
export const getProducts = async (query: any) => {
  query = query || ""; 
  const { data } = await http.get(`/products${query}`);
  return data;
};
export const getAllProducts = async () => {
  const { data } = await http.get(`/products/all`);
  return data;
};
export const getNewProducts = async () => {
  const { data } = await http.get(`/products/new`);
  return data;
};

export const getNewArrivels = async () => {
  const { data } = await http.get("/new-arrivals");
  return data;
};
export const getProductDetails = async (id: any) => { 
  const { data } = await http.get(`/products/${id}`);
  return data;
};
export const getProductReviews = async (id: any) => {
  const { data } = await http.get(`/reviews/${id}`);
  return data;
};
export const addReview = async (payload: any) => {
  const { data } = await http.post(`/reviews/${payload.id}`, payload);
  return data;
};
export const getCategories = async () => {
  const { data } = await http.get(`/categories`);
  return data;
};
export const getUserProfile = async (page: any) => {
  const { data: response } = await http.get(`/users/profile${page}`);
  return response;
};
export const getUser = async () => {
  const { data } = await http.get(`/users/me`);
  return data;
};
export const updateUser = async ({ id, ...payload }: any) => {
  const { data } = await http.put(`/users/${id}`, payload);
  return data;
};
export const changerPassword = async ({ id, ...payload }: any) => {
  const { data } = await http.put(`/users/change-password/${id}`, payload);
  return data;
};
export const forgetPassword = async (payload: any) => {
  const { data } = await http.post("/auth/forget-password", {
    email: payload,
  });
  return data;
};
export const resetPassword = async ({ newPassword, token }: any) => {
  const { data } = await http.post("/auth/reset-password", {
    newPassword: newPassword,
    token: token,
  });
  return data;
};
export const getAddress = async (id: any) => {
  const { data } = await http.get(`/users/addresses/${id}`);
  return data;
};
export const updateAddress = async ({ id, ...payload }: any) => {
  const { data } = await http.put(`/users/addresses/${id}`, payload);
  return data;
};
export const createAddress = async ({ id, ...payload }: any) => {
  const { data } = await http.post(`/users/addresses/${id}`, payload);
  return data;
};
export const deleteAddress = async ({ id, ...payload }: any) => {
  const { data } = await http.delete(`/users/addresses/${id}`, {
    data: payload,
  });
  return data;
};
export const search = async (payload: any) => {
  const { data } = await http.post(`/products/search`, payload);
  return data;
};
export const getInvoices = async () => {
  const { data } = await http.get(`/users/invoice`);
  return data;
};
export const placeOrder = async (payload: any) => {
  const { data } = await http.post(`/orders`, payload);
  return data;
};
export const getLayout = async () => {
  const { data } = await http.get(`/layout`);
  return data;
};
export const singleDeleteFile = async (payload: any) => {
  const { data } = await http.delete(`/delete`, { data: payload });
  return data;
};
export const getNotification = async (page: any) => {
  const { data } = await http.get(`/notifications?page=${page}`, {});
  return data;
};

export const sendNewsletter = async (payload: any) => {
  const { data } = await http.post(`/newsletter`, payload);
  return data;
};
export const getSingleOrder = async (payload: any) => {
  const { data } = await http.get(`/orders/${payload}`);
  return data;
};
export const updateWishlist = async (payload: any) => {
  const { data } = await http.post(`/wishlist`, payload);
  return data;
};

export const getSliders = async () => {
  const { data } = await http.get(`/sliders/primary`);
  return data;
};

export const getWishlist = async () => {
  const { data } = await http.get(`/wishlist`);
  return data;
};

export const getRates = async (currency: any) => {
  // const { data } = await axios.get(
  //   `https://api.exchangerate-api.com/v4/latest/inr`
  // );
  // const unitRate = data.rates[currency.toUpperCase()] || 1;
  const unitRate = 1;
  return unitRate;
};
