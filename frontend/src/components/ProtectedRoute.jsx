import { useEffect,useState } from "react";
import {checkAuth} from "../services/api";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const [loading,setLoading] = useState(true);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await checkAuth();
                setIsLoggedIn(res.data.loggedIn);
            }catch(error){
                setIsLoggedIn(false);
            }
            setLoading(false);
        })();
    },[]);

    if(loading) return <p>Loading...</p>
    return isLoggedIn ? children : <Navigate to="/"/>;
}