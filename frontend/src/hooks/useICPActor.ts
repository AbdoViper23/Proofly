import { useState, useEffect } from 'react';
import { createICPActor } from '@/lib/icp/actor';

/**
 * Custom React Hook for ICP Actor
 * Automatically initializes the actor on mount and manages loading/error states
 * 
 * @returns {object} { actor, loading, error }
 * - actor: The ICP actor instance (null until loaded)
 * - loading: Boolean indicating if the actor is being initialized
 * - error: Error message if initialization failed (null otherwise)
 */
export const useICPActor = () => {
    const [actor, setActor] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeActor = async () => {
            try {
                setLoading(true);
                setError(null);
                const icpActor = await createICPActor();
                setActor(icpActor);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to connect to backend';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        initializeActor();
    }, []);

    return { actor, loading, error };
};

