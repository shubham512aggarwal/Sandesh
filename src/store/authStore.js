import {create} from 'zustand';

const useAuthStore = create((set) =>{
    const useAuthToken = localStorage.getItem('accessToken');
    const isAuth = !!useAuthToken;
    return {

        isAuthenticated: isAuth,
        token: useAuthToken,
        login: (token)=> {
            localStorage.setItem('accessToken', token);
            set({isAuthenticated: true, token})
        },
        logout: () => {
            localStorage.removeItem('accessToken');
            set({ isAuthenticated: false, token: null });
        }
    }
});

export default useAuthStore;