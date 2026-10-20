
import React, { useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useAuth } from "./ExperimentB4";

import {
  validateEmail,
  validateName,
  validatePassword
} from "./ExperimentE4";

function ExperimentA4() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!validateName(name)) {
        setError("Enter a valid full name.");
        return;
      }
    }

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (isSignup) {
      if (!validatePassword(password)) {
        setError(
          "Password must have at least 6 characters, one uppercase letter and one number."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      let result;

      if (isSignup) {
        result = await signup(name, email, password);
      } else {
        result = await login(email, password);
      }

      if (!result.success) {
        setError(result.error || "Authentication failed.");
        return;
      }

      const destination =
        location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignup((previous) => !previous);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="form-page">
      <div className="form-box">

        <h1>
          {isSignup ? "📝 Create Account" : "🔐 Login"}
        </h1>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder={isSignup ? "Create Password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isSignup
                ? "Sign Up"
                : "Login"}
          </button>

        </form>

        <p>
          {isSignup
            ? "Already have an account? "
            : "Don't have an account? "}

          <button
            type="button"
            className="secondary-btn"
            onClick={switchMode}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default ExperimentA4;
