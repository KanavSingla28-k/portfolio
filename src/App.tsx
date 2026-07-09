import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1>Rebuilding...</h1>
          <p>The UI has been cleared for a complete rebuild.</p>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
