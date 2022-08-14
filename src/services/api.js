import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* Company */

export const signUp = async (signUpData) => {
  return await api.post("/companies/signup", signUpData);
};

export const signIn = async (signInData) => {
  return await api.post("/companies/signin", signInData);
};

export const getCompanyData = async () => {
  return await api.get("/companies");
};

/* Products */

export const createProduct = async (productData) => {
  return await api.post("/products", productData);
};

export const getProducts = async () => {
  return await api.get("/products");
};

export const getProductsByName = async (productName) => {
  return await api.get(`/products/?name=${productName}`);
};

export const updateProduct = async (productData) => {
  const { id } = productData;
  return await api.put(`/products/${id}`, productData);
};

export const deleteProduct = async (productId) => {
  return await api.delete(`/products/${productId}`);
};

/* Sales */

export const createSale = async (saleData) => {
  return await api.post("/sales", saleData);
};

export const getSales = async () => {
  return await api.get("/sales");
};

export const deleteSale = async (saleId) => {
  return await api.delete(`/sales/${saleId}`);
};

/* Expenses */

export const createExpense = async (expenseData) => {
  return await api.post("/expenses", expenseData);
};

export const getExpenses = async () => {
  return await api.get("/expenses");
};

export const updateExpense = async (expenseData) => {
  const expenseId = expenseData.id.toString();
  return await api.put(`/expenses/${expenseId}`, expenseData);
};

export const deleteExpense = async (expenseId) => {
  return await api.delete(`/expenses/${expenseId}`);
};
