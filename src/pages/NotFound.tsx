import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: 'var(--bg-base)',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontFamily: 'Geist, sans-serif', 
        fontSize: 'clamp(4rem, 10vw, 8rem)', 
        color: 'var(--text-primary)', 
        margin: '0 0 16px 0',
        lineHeight: 1
      }}>
        404
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        color: 'var(--text-secondary)', 
        marginBottom: '32px' 
      }}>
        Page not found.
      </p>
      
      {/* We use standard anchor here since we're using React Router's BrowserRouter but for a simple SPA we might just want to href="/" */}
      <Button variant="primary" href="/">
        Return Home
      </Button>
    </div>
  );
};
