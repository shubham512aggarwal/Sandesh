import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { authAction } from "../service/apiService";

export default function Login(){

    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuthStore();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const loginDto = {
            email, password
        }
        try {
            const res = await authAction('login', loginDto, 'POST')
            login(res.token);
            navigate('/chat');
        } catch (error) {
            console.log("Something went wrong in Login : ", error)
        }
    }

    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Sandesh</h2>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
                />
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                Login
                </button>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >Sign up
                    </span>
                </p>
            </form>
        </div>
    )
}