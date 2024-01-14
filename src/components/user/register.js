import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createUser } from '../../redux/usersSlice';
import logo from '../../assets/logoTwo.png';
import './style.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState(null);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateFormData = () => {
  const { name, email, password, password_confirmation } = formData;
  let errors = [];

  if (name === '') {
    errors.push(<>
    <span style={{ color: 'red', fontWeight: 'bold' }}>Name </span><span> is required</span>
    </>);
  }

  if (email === '') {
    errors.push(<>
    <span style={{ color: 'red', fontWeight: 'bold' }}>Email</span> <span>is required</span>
    </>);
  } else if (!email.includes('@') || !email.includes('.')) {
    errors.push(<span style={{ color: 'red', fontWeight: 'bold' }}>Invalid email address</span>);
  }

  if (password === '') {
    errors.push(<>
    
    <span style={{ color: 'red', fontWeight: 'bold' }}>Password </span><span>is required</span>
    </>);
  } else if (password.length < 6) {
    errors.push(<span>Password must be at least 6 characters</span>);
  }

  if (password_confirmation === '') {
    errors.push("Password confirmation is required");
  } else if (password_confirmation !== password) {
    errors.push("Passwords do not match");
  }

  if (errors.length > 0) {
    setError(errors);
    handleErrorDialogOpen();
    return false;
  }

  return true;
};

   

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFormData()) {
      signup(formData);
    }
  };

  const signup = async (user) => {
    const userData = {
      user: user,
    };

    const action = await dispatch(createUser(userData));

    if (createUser.fulfilled.match(action)) {
      setSuccessMessage('Registration successful. Redirecting to Sign In page...');
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } else if (createUser.rejected.match(action)) {
      setError('Sign-up failed: ' + action.error.message);
      handleErrorDialogOpen();
    }
  };

  const handleErrorDialogOpen = () => {
    setIsErrorDialogOpen(true);
  };

  const handleErrorDialogClose = () => {
    setIsErrorDialogOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen signin-container">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-md w-full signin-content">
      <img src={logo} alt="Logo" className="mx-auto mb-4 h-22 w-66" />
        <h3 className="text-2xl text-center font-semibold mb-4">Sign Up</h3>
        {successMessage && (
          <div className="bg-green-200 text-green-800 border p-2 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-gray-600 text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="w-full p-2 bg-lime-500 text-white rounded-md cursor-pointer">Sign Up</button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/signin" className="text-lime-500 font-semibold">Login</Link>
        </p>
      </div>

      {/* Error Modal Dialog */}
      {isErrorDialogOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white shadow-lg rounded-md p-4 max-w-md w-full">
            <h3 className="text-2xl text-center text-red-500 font-semibold mb-4">Error</h3>
            <p className="text-center text-gray-600">{error}</p>
            <div className="mt-4 text-center">
              <button
                className="p-2 bg-red-500 text-white rounded-md cursor-pointer"
                onClick={handleErrorDialogClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;