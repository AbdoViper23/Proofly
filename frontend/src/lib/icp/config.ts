import { canisterId as declaredCanisterId } from '@/declarations/backend';

/**
 * Get network configuration based on environment
 */
export const getNetworkConfig = () => {
    const isBrowser = typeof window !== 'undefined';
    const isLocalhost = isBrowser && (
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('.localhost')
    );
    const isDevelopment = process.env.NODE_ENV === 'development';
    const network = process.env.NEXT_PUBLIC_DFX_NETWORK || (isDevelopment || isLocalhost ? 'local' : 'ic');
    
    let host: string;
    if (network === 'local' || isDevelopment || isLocalhost) {
        host = 'http://localhost:4943';
    } else {
        host = 'https://ic0.app';
    }
    
    return { network, host, isDevelopment };
};

/**
 * Canister ID from multiple sources with fallbacks
 */
export const CANISTER_ID = 
    process.env.NEXT_PUBLIC_CANISTER_ID_BACKEND || 
    declaredCanisterId || 
    'uxrrr-q7777-77774-qaaaq-cai';

