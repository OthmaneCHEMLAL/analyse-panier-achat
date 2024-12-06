import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL, 
});

export const getTotalSales = async (startDate, endDate) => {
  const response = await axios.get(`${API_BASE_URL}/total_sales`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export default api;
