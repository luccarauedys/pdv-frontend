import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const signUp = async (signUpData) => {
  return await api.post("/companies/signup", signUpData);
};

export const signIn = async (signInData) => {
  return await api.post("/companies/signin", signInData);
};

export const getCompanyData = async () => {
  return await api.get("/companies");
};

export const postProduct = async (productData) => {
  return await api.post("/products", productData);
};

export const getProducts = async () => {
  return await api.get("/products");
};

export const getProductsByName = async (productName) => {
  return await api.get(`/products/?name=${productName}`);
};

export const updateProduct = async (productId, dataToUpdate) => {
  return await api.put(`/products/${productId}`, dataToUpdate);
};

export const deleteProduct = async (productId) => {
  return await api.delete(`/products/${productId}`);
};
