import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store.js';
import { Protected } from './components/index.js';
import { HomeGate,About,Order, Menu,Contact,VerifyOtp,Dashboard} from './pages/index.js'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeGate />} />

      {/* Only when logged in */}
      <Route element={<Protected authentication={true} />}>
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order/>}/>
        <Route path="/menu" element={<Menu/>}/>
      </Route>

      {/* Only when NOT logged in */}
      <Route element={<Protected authentication={false} />}>
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Route>

      <Route path="/contact" element={<Contact />} />
    </Route>
  )
);



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
{/* #NOTE: research on fallbackElement  */}
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </Provider>
)
