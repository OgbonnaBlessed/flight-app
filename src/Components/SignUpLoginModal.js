import React, { useState } from 'react';
import { useAuth } from "../AuthContext";

const SignUpLoginModal = ({ closeModal }) => {
  const { signUp, logIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (isSignUp) {
      // Call signUp function
      try {
        signUp(data);
        closeModal();
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Call logIn function
      try {
        logIn(data);
        closeModal();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        {isSignUp ? (
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <span onClick={toggleSignUp}>Log In</span></p>
          </div>
        ) : (
          <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <span onClick={toggleSignUp}>Sign Up</span></p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SignUpLoginModal;