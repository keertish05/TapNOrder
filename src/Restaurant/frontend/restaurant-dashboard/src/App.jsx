import React from 'react'
import { getUser } from './api/authApi.js';
import {useDispatch} from 'react-redux';
import { login,logout } from './slice/auth/authSlice.js';
import {Header,Footer,AuthModal} from './components/index.js';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import { useState } from "react";


function App() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const [authPopup, setAuthPopup] = useState({
    open: false,
    type: "login",
  });

  React.useEffect(() => {
    getUser()
      .then((res) => {
        if (res) {
          dispatch(login(res.data));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (location.state?.openAuth) {
      setAuthPopup({
        open: true,
        type: location.state.type || 'login',
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return !loading ? (
    <div className="min-h-screen flex flex-col">

      {/* =============== Toast Container =================*/}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* =============== App Modal =================*/}
      <Header setAuthPopup={setAuthPopup} />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <Footer />

      {/* =============== Auth Modal =================*/}
      {authPopup.open && (
        <AuthModal
          type={authPopup.type}
          onClose={() => setAuthPopup({ ...authPopup, open: false })}
          switchMode={(mode) => setAuthPopup({ open: true, type: mode })}
        />
      )}

    </div>
  ) : (
    <p>Loading...</p>
  );
}
export default App;
