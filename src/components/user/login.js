import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/usersSlice';
import logo from '../../assets/logo.png';
import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateData()) {
      try {
        const userData = {
          user: formData
        };
        const action = await dispatch(loginUser(userData));
        if (loginUser.fulfilled.match(action)) {
          localStorage.setItem('email', formData.email);
          navigate('/');
        } else if (loginUser.rejected.match(action)) {
          setError(action.error.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const validateData = () => {
    if (formData.email === '' || formData.password === '') {
      setError('Email and password are required');
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center signin-container">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md signin-content">
        <img src={logo} alt="Logo" className="mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-center mb-4">Sign In</h3>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              name="email"
              id="email"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 bg-lime-500 text-white rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center">
          Do Not have an account?{' '}
          <Link to="/" className="text-lime-500 font-semibold">
            <b>Sign Up</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
