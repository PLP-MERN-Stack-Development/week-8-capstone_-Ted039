import { useState, useContext } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-md rounded-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <input name="email" placeholder="Email"
            className="w-full border px-3 py-2 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password"
            className="w-full border px-3 py-2 rounded" onChange={handleChange} />
        <button type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Sign In
        </button>

        <p className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
                Register here
            </a>
        </p>

    </form>

  );
};

export default Login;
