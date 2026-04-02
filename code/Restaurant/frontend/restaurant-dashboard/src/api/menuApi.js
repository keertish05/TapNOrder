import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4002/api/v1",
    withCredentials: true,
});

export const createMenu = (credentials) => api.post('/menu/', credentials);
export const getMenuItems = (category) => api.get('/restaurants/menu/', { params: { category } });
export const updateMenuItem = (id, credentials) => api.put(`/restaurants/menu/${id}`, credentials);
export const deleteMenuItem = (id) => api.delete(`/restaurants/menu/${id}`);
