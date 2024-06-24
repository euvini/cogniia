import axios from 'axios';
import { useAuthStore } from '../zustand-store/authStore';

const api = axios.create({
    baseURL: 'https://54.144.228.160',
    headers: {
        "Content-Type": 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().user?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
