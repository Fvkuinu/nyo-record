// src/app/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/client'; // Import initialized auth instance

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Track the loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false); // Set loading to false when the user state is determined
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, []);

    return { user, loading };
};

export default useAuth;
