import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request if it exists
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const fetchProducts = (search = '', category = '') =>
  API.get(`/products?search=${search}&category=${category}`);

export const fetchProductById = (id) =>
  API.get(`/products/${id}`);

export const loginUser = (email, password) =>
  API.post('/auth/login', { email, password });

export const registerUser = (name, email, password) =>
  API.post('/auth/register', { name, email, password });

export default API;
export const createProduct = (productData) =>
  API.post('/products', productData);

export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);