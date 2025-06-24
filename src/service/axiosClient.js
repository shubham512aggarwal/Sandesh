import axios from 'axios';
import useAuthStore from '../store/authStore';

const AUTH_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CHAT_URL = import.meta.env.VITE_CHAT_BASE_URL;

const apiClient = axios.create({
    baseUrl: CHAT_URL,
    withCredentials: true
});

//Store reference for token in Zustand
let authStore = null;
export const bindAuthStore = (store) => {
    authStore = store;
};

//Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = authStore?.getState().token;
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;

        if(error.response?.state == 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const refreshRes = await axios.post(`${AUTH_URL}/refreshToken`, {}, {withCredentials: true});
                const newToken = refreshRes.data.token;

                //Save new token in Zustand
                authStore.getState().login(newToken);

                //update header and retry original request
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (error) {
                console.log("Refresh token error ", error);
                authStore.getState().logout();
                window.location.href("/login");
            }
        }
        return Promise.reject(error);
    }
)

export default apiClient;

