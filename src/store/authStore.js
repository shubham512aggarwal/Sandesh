import {create} from 'zustand';

const useAuthStore = create((set) =>({
    isAuthenticated: false,
    token: null,
    login: (token)=> set({isAuthenticated: true, token}),
    logout: () => set({isAuthenticated: false, token: null})
}));

export default useAuthStore;