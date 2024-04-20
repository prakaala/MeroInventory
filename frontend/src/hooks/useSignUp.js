import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error.message);
            }

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'SIGNUP', payload: json });

            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
