# ICP Backend Integration

This directory contains the centralized ICP backend integration logic for the Proofly frontend application.

## Architecture

The ICP integration is organized into three main layers:

### 1. Configuration Layer (`config.ts`)
- **Purpose**: Centralized configuration management
- **Exports**:
  - `getNetworkConfig()`: Determines network settings (local/production)
  - `CANISTER_ID`: Backend canister identifier with multiple fallbacks

### 2. Actor Layer (`actor.ts`)
- **Purpose**: ICP Actor creation and management
- **Exports**:
  - `createICPActor()`: Creates and configures an ICP Actor instance
- **Features**:
  - Automatic network detection
  - Root key fetching for local development
  - Comprehensive error handling

### 3. React Hook Layer (`/hooks/useICPActor.ts`)
- **Purpose**: Provide a clean React interface for ICP integration
- **Exports**:
  - `useICPActor()`: Custom hook for easy ICP Actor usage in React components
- **Returns**:
  - `actor`: The ICP actor instance (null until loaded)
  - `loading`: Boolean indicating initialization status
  - `error`: Error message if initialization failed

## Usage

### In React Components

```typescript
import { useICPActor } from '@/hooks/useICPActor';

function MyComponent() {
    const { actor, loading, error } = useICPActor();
    
    useEffect(() => {
        if (!actor) return;
        
        // Use actor to call backend functions
        const fetchData = async () => {
            const result = await actor.my_backend_function();
            // Handle result...
        };
        
        fetchData();
    }, [actor]);
    
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    
    return <div>Your content...</div>;
}
```

## Type Definitions

All backend-related TypeScript types are centralized in `/types/backend.ts`:
- `Proof`: Employment proof structure
- `Company`: Company information
- `Employee`: Employee information
- `Result<T>`: Backend Result type (Ok/Err)

## Environment Variables

The integration automatically reads these environment variables:
- `NEXT_PUBLIC_DFX_NETWORK`: Network type ('local' or 'ic')
- `NEXT_PUBLIC_CANISTER_ID_BACKEND`: Backend canister ID

These are configured in `next.config.ts` and populated by `dfx` during deployment.

## Network Detection

The system automatically detects the runtime environment:
1. Checks browser hostname for localhost variations
2. Checks `NODE_ENV` for development mode
3. Reads `NEXT_PUBLIC_DFX_NETWORK` environment variable
4. Defaults to appropriate network based on detection

## Error Handling

All layers include comprehensive error handling:
- Configuration errors (missing canister ID)
- Connection errors (root key fetch failures)
- Runtime errors (actor creation failures)

Errors are propagated through the React hook for easy UI integration.

## Benefits

- **DRY**: Single source of truth for ICP configuration
- **Type Safety**: Full TypeScript support
- **Reusability**: Import and use in any component
- **Maintainability**: Easy to update or extend
- **Testability**: Easy to mock for unit tests
- **Consistency**: All pages use identical connection pattern

