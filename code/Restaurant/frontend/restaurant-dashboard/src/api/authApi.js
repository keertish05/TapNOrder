import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4001/api/v1/restaurants",
    withCredentials: true,
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (credentials) => api.post('/auth/register',credentials);
export const logout = () => api.post('/auth/logout');
export const verifyOtp = (credentials) => api.post('/auth/verify-otp',credentials);
export const resendOtp = (credentials) => api.post('/auth/resend-otp',credentials);
export const getUser = () => api.get('/auth/get-user');