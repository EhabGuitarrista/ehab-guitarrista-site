import { useEffect } from 'react';

const AdminRedirect = () => {
  useEffect(() => {
    // Redirect to the Vercel CMS
    window.location.href = 'https://ehab-guitarrista-cms.vercel.app/';
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecting to Admin Panel...</h2>
        <p>If you're not redirected automatically, <a href="https://ehab-guitarrista-cms.vercel.app/" target="_blank" rel="noopener noreferrer">click here</a></p>
      </div>
    </div>
  );
};

export default AdminRedirect;