import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { login as LoginApi,signup,getUser } from '../../api/authApi.js';
import { login } from '../../slice/auth/authSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function AuthModal({ type, onClose, switchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAuth = async (data) => {
  try {
    let response;

    if (type === 'login') {
      response = await LoginApi(data);
      toast.success('Login successful');
    } else {
      response = await signup(data);
      toast.success('Account created successfully');
    }

    if (response) {
      const userData = await getUser();
      if (userData) dispatch(login(userData));
      onClose();
      navigate('/');
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong');
    toast.error(err.response?.data?.message || 'Something went wrong');
  }
  };



  return (
    <div
      className="fixed inset-0 z-[100] px-6 flex items-center justify-center bg-black/40 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-md rounded-xl p-6"
      >
        <button
          onClick={() => {
            if (!isSubmitting) onClose();
          }}
          disabled={isSubmitting}
          className={`absolute top-3 right-3 text-gray-500 hover:text-black
            ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          ✕
        </button>


        <h2 className="text-2xl font-semibold text-center mb-4">
          {type === 'login' ? 'Login' : 'Get Started'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(handleAuth)}>
          {/* Restaurant name only for signup */}
          {type === 'signup' && (
            <input
              type="text"
              placeholder="Restaurant Name"
              required
              className="w-full border px-4 py-2 rounded-lg"
              {
                ...register('name', { required: true })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg"
            required
            {...register('email',{
                required: true,
                validate: {
                    matchPattern: (value) =>
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)
                      || 'Email address must be valid'
                }
            })}
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="w-full border px-4 py-2 rounded-lg pr-10"
              {...register("password",{
                  required:true,
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#FF342C] text-white py-2 rounded-lg 
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting
              ? type === 'login'
                ? 'Logging in...'
                : 'Creating account...'
              : type === 'login'
              ? 'Login'
              : 'Create Account'}
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          {type === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                disabled={isSubmitting}
                onClick={() => {
                  if (!isSubmitting) switchMode('signup');
                }}
                className={`text-[#FF342C] 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                disabled={isSubmitting}
                onClick={() => {
                  if (!isSubmitting) switchMode('login');
                }}
                className={`text-[#FF342C] 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
