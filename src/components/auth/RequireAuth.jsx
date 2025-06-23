import React from "react";
import useAuthStore from "../../store/authStore";
import { Navigate } from "react-router-dom";

export default function RequireAuth({children}){
    const isAuthenticated = useAuthStore();

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    return children;
}