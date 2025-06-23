import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { authAction } from "../service/apiService";

export default function Signup(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const registerDto = {
            username, email, password, phoneNumber
        };
        try {
            const result = await authAction('register', registerDto)
            console.log(registerDto);
            navigate('/login');
        } catch (error) {
            console.log("Something went wrong in registration. ", error);
        }
        }

    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Create your Sandesh account</h2>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
                />
                <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                />
                <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                Sign Up
                </button>
                <p className="text-sm text-center text-gray-600 mt-4">Already have an account? {' '} 
                    <span className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </div>
    )
}