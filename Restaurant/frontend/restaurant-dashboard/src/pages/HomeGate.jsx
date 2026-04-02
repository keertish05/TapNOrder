import { useSelector } from 'react-redux';
import { Home, LandingPage,Dashboard } from './index.js';

function HomeGate() {
  const isAuthenticated = useSelector(state => state.auth.status);

  return isAuthenticated ? <Dashboard /> : <LandingPage />;
}

export default HomeGate;
