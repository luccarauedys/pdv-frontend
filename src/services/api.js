import axios from "axios";

const api = axios.create({
  baseURL: "https://projeto-pdv.herokuapp.com/",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

const getConfig = () => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: token } };
  return config;
};

/* Company */

export const signUp = async (signUpData) => {
  return await api.post("/companies/signup", signUpData);
};

export const signIn = async (signInData) => {
  return await api.post("/companies/signin", signInData);
};

export const getCompanyData = async () => {
  return await api.get("/companies", getConfig());
};

/* Products */

export const createProduct = async (productData) => {
  return await api.post("/products", productData, getConfig());
};

export const getProducts = async () => {
  return await api.get("/products", getConfig());
};

export const getProductsByName = async (productName) => {
  return await api.get(`/products/?name=${productName}`, getConfig());
};

export const updateProduct = async (productData) => {
  const { id } = productData;
  return await api.put(`/products/${id}`, productData, getConfig());
};

export const deleteProduct = async (productId) => {
  return await api.delete(`/products/${productId}`, getConfig());
};

/* Sales */

export const createSale = async (saleData) => {
  return await api.post("/sales", saleData, getConfig());
};

export const getSales = async () => {
  return await api.get("/sales", getConfig());
};

export const deleteSale = async (saleId) => {
  return await api.delete(`/sales/${saleId}`, getConfig());
};

/* Expenses */

export const createExpense = async (expenseData) => {
  return await api.post("/expenses", expenseData, getConfig());
};

export const getExpenses = async () => {
  return await api.get("/expenses", getConfig());
};

export const updateExpense = async (expenseData) => {
  const expenseId = expenseData.id.toString();
  return await api.put(`/expenses/${expenseId}`, expenseData, getConfig());
};

export const deleteExpense = async (expenseId) => {
  return await api.delete(`/expenses/${expenseId}`, getConfig());
};
