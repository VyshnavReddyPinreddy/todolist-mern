import React, {createContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import API from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);
    
    const login = async (email, password) => {
        try {
            const {data} = await API.post('/auth/login', {email, password});
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            navigate('/');
        } catch(error) {
            console.error('Login failed:', error);
            throw error;
        }
    };
    
    const signup = async (username, email, password) => {
        try {
            const {data} = await API.post('/auth/signup', {username, email, password});
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            navigate('/');
        } catch(error) {
            console.error('SignUp failed:', error);
            throw error;
        } 
    };
    
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{user, login, signup, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};