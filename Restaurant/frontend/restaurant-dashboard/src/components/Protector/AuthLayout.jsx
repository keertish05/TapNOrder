import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function Protected({ authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  // 🔒 Needs login but user is not logged in
  if (authentication && !authStatus) {
    return (
      <Navigate
        to="/"
        replace
        state={{ openAuth: true, type: 'login' }}
      />
    );
  }

  // 🔓 Public-only route but user is logged in
  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Protected;
