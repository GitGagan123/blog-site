import axios from "axios";

export const getOrders = (SortName: string) => {
  const ordersApiUrl = `http://localhost:5266/api/pizzaorders?sortName=${SortName}`;
  return axios.get(ordersApiUrl);
};
