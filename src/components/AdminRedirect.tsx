import { useEffect } from 'react';

const AdminRedirect = () => {
  useEffect(() => {
    // Redirect to the static admin page
    window.location.href = '/admin/index.html';
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
        <p>If you're not redirected automatically, <a href="/admin/index.html">click here</a></p>
      </div>
    </div>
  );
};

export default AdminRedirect;