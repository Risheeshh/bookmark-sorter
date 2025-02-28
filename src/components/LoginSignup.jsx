import React, { useState, useContext } from 'react';
import { UserContext } from "../App"; // ✅ Import UserContext

export default function LoginSignup() {
  const { setIsAuthenticated, setUsername } = useContext(UserContext); // ✅ Access context
  const [isSignup, setIsSignup] = useState(false);
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async () => {
    if (!inputUsername || !password) {
      setError('Both fields are required!');
      return;
    }

    try {
      const endpoint = isSignup ? 'http://localhost:5000/auth/signup' : 'http://localhost:5000/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: inputUsername, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true); // ✅ Set authentication state
        setUsername(data.username); // ✅ Store username globally
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg animate-pulse mb-8">
        Bookmark Sorter
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <button
          onClick={handleAuth}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-purple-400 hover:underline cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
